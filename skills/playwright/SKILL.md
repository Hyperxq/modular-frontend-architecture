# Skill: playwright (project-local)

Extends the global Playwright skill with project-specific setup, browser install,
and MF dev server orchestration for this monorepo.

---

## Browser Installation in AI Agents (OpenCode / Claude)

The MCP Playwright server looks for `chrome` at `/opt/google/chrome/chrome` by default.
That binary is **not available** in this environment.

### Fix 1 — Configure MCP to use chromium (preferred, one-time)

In `~/.config/opencode/opencode.json`, add `--browser chromium` to the Playwright MCP command:

```json
"playwright": {
  "command": ["npx", "@playwright/mcp@latest", "--browser", "chromium"],
  "enabled": true,
  "type": "local"
}
```

Then install Chromium once:

```bash
bunx playwright install chromium
# installs to ~/.cache/ms-playwright/chromium-XXXX/
```

Restart OpenCode after editing the config — the MCP server relaunches with the new flag.

### Fix 2 — Hermetic install (no sudo needed)

If you can't edit the MCP config:

```bash
PLAYWRIGHT_BROWSERS_PATH=0 bunx playwright install chromium
```

Puts the binary inside the `bunx` temp cache. No system permissions required.

If you get `Chromium distribution 'chrome' is not found`, apply Fix 1 above.

---

## Dev Servers — Required Before Running E2E

Tests run against the shell host on `:3002`. The MF remote (`ui-components`) must
be on `:3001` first.

| Server | Port | Command |
|--------|------|---------|
| `ui-components` MF remote | 3001 | `nx run @modular-frontend/ui-components:dev` |
| `shell` host | 3002 | `nx run @modular-frontend/shell:dev` |

`playwright.config.ts` has `webServer` configured with `reuseExistingServer: true`
for local dev — if both servers are already running, Playwright reuses them and
skips startup. In CI (`process.env.CI=true`) it always starts fresh.

**Start both servers (correct order, readyWhen gated):**
```bash
bun run dev   # from repo root — orchestrates order via web:dev:remote → web:dev
```

---

## Running Tests

```bash
# From repo root
bun run e2e           # headless, all browsers
bun run e2e:ui        # interactive UI mode
bun run e2e:debug     # debug mode (headed, step-by-step)
bun run e2e:report    # open last HTML report

# From automation_test/
bunx playwright test
bunx playwright test --grep "Button"   # filter by name
bunx playwright test --project=chromium  # single browser
```

---

## Project Structure

```
automation_test/
  base-page.ts              # BasePage — all page objects extend this
  helpers.ts                # shared utilities and data generators
  playwright.config.ts      # config — baseURL, webServer, projects
  {feature}/
    {feature}-page.ts       # Page Object Model
    {feature}.spec.ts       # ALL tests for this feature (one file only)
    {feature}.md            # test documentation
```

---

## Config Reference

```
automation_test/playwright.config.ts
```

Key values:
- `baseURL`: `http://localhost:3002` (overridable via `PLAYWRIGHT_BASE_URL`)
- `testDir`: `./` (relative to `automation_test/`)
- `testMatch`: `**/*.spec.ts`
- Browsers: `chromium`, `firefox`, `mobile-chrome` (Pixel 5)
- Traces + screenshots + video: captured on failure / first retry

---

## MCP Workflow for AI Agents

1. Ensure dev servers are running (`bun run dev` from repo root)
2. If browser tools fail with "not found" → run the `PLAYWRIGHT_BROWSERS_PATH=0` install
3. Navigate to `http://localhost:3002`
4. Use `browser_snapshot` (NOT screenshot) to inspect the DOM
5. Interact with elements using refs from the snapshot
6. Only write test code AFTER verifying the real flow via MCP tools

---

## Non-Negotiable Rules (inherit from global skill)

- Selectors: `getByRole` > `getByLabel` > `getByText` > `getByTestId`
- One `spec.ts` per feature — never split into multiple files
- All page objects extend `BasePage` from `automation_test/base-page.ts`
- Reuse existing page objects before creating new ones
- Test imports from `@playwright/test`, never from `vitest` or `jest`
