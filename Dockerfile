# =============================================================================
# Dockerfile — modular-frontend-architecture
#
# Multi-stage build for the Preact micro-frontend monorepo.
#
# Stages:
#   base  → Bun runtime + non-root user
#   deps  → Install workspace dependencies (cached by lockfile)
#   build → Build ui-components + shell, merge MF assets
#   serve → Nginx serving the merged production dist
#
# Usage:
#   docker build -t modular-frontend .
#   docker build --build-arg PUBLIC_BUCKET_URL=https://my-cdn.example.com -t modular-frontend .
#   docker build --target deps -t modular-frontend:deps .    # dev services
# =============================================================================

# ─── base ──────────────────────────────────────────────────────────────────────
# Bun runtime on Debian — used by deps and build stages
# Creates a non-root user for security
FROM oven/bun:1.3-debian AS base

WORKDIR /app

RUN groupadd --gid 1001 appuser \
    && useradd --uid 1001 --gid 1001 --create-home appuser \
    && apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*


# ─── deps ──────────────────────────────────────────────────────────────────────
# Install all workspace dependencies — cached unless lockfile or package.json changes
FROM base AS deps

# 1. Copy workspace-level configs first (changes least often → best cache)
COPY package.json bun.lock nx.json biome.json ./
COPY packages/shell/package.json packages/shell/
COPY packages/libraries/ui-components/package.json packages/libraries/ui-components/
COPY packages/libraries/shared/package.json packages/libraries/shared/

# 2. Copy files needed by postinstall (bun install triggers `bun scripts/setup-env.ts`)
#    setup-env.ts reads .env.example and creates .env.* files from it
COPY scripts/ scripts/
COPY .env.example .env.example

# 3. Install all dependencies — frozen lockfile ensures reproducible builds
#    postinstall creates .env.development.local, .env.development, .env.mock, .env.production
RUN bun install --frozen-lockfile

# 4. Switch to non-root user after install completes
USER appuser


# ─── build ─────────────────────────────────────────────────────────────────────
# Build ui-components (Rslib) then shell (Rsbuild), merge MF assets into shell dist
FROM deps AS build

# Switch to root for build operations (COPY requires root ownership)
USER root

# Copy full source tree — deps layer already has node_modules cached
COPY . .

# Accept PUBLIC_BUCKET_URL as build argument
# Default: empty string (self-hosted — assets served from same origin as the container)
ARG PUBLIC_BUCKET_URL=""

# Overwrite .env.production with the build arg value
# This controls assetPrefix in both shell and ui-components MF output
# When empty, rsbuild uses relative paths (works for same-origin serving)
RUN printf 'PUBLIC_BUCKET_URL=%s\nPUBLIC_GATEWAY_BACKEND=\nPUBLIC_ENABLE_MOCKING=false\nPUBLIC_MSW_ON_UNHANDLED=bypass\n' \
    "${PUBLIC_BUCKET_URL}" > .env.production

# Step 1: Build ui-components (Rslib — produces MF remote + ESM + CJS)
RUN bunx rslib build --cwd packages/libraries/ui-components

# Step 2: Build shell (Rsbuild — produces the host SPA)
RUN bunx rsbuild build --env-mode production --cwd packages/shell

# Step 3: Merge MF remote assets into shell dist
# This mirrors the deploy CI step — shell serves everything from a single root
RUN mkdir -p packages/shell/dist/ui-components/mf \
    && cp -r packages/libraries/ui-components/dist/ui-components/mf/* \
             packages/shell/dist/ui-components/mf/


# ─── serve ─────────────────────────────────────────────────────────────────────
# Minimal Nginx image serving the merged production dist
FROM nginx:1.27-alpine AS serve

# Remove default Nginx configuration
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom SPA-aware Nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the merged dist from the build stage
COPY --from=build /app/packages/shell/dist /usr/share/nginx/html

EXPOSE 80

# Health check — used by Docker Compose and orchestrators
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/health || exit 1
