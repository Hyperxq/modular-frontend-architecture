---
name: lefthook
description: >
  Lefthook Git hooks and Conventional Commits patterns for this project.
  Trigger: When configuring lefthook.yml, writing commit messages, adding git hooks, or understanding commit conventions.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Configuring or modifying `lefthook.yml`
- Writing or reviewing commit messages
- Adding new git hooks (pre-commit, commit-msg, pre-push, etc.)
- Debugging hook failures
- Onboarding: installing hooks after cloning

## Critical Rules

- ALL commits MUST follow Conventional Commits: `type(scope): description`
  - lowercase type and scope, imperative mood description
  - NEVER use vague messages: "fix stuff", "update", "wip", "changes", "misc"
- `pre-commit` runs lint + format on staged files only — fast, scoped
- `commit-msg` validates against commitlint — a failing hook REJECTS the commit
- Install hooks after every fresh clone: `bunx lefthook install`
- Package manager is **Bun** — always use `bunx` (not `npx`) for hook runners

## Conventional Commits Format

```
type(scope): short description
```

Rules:
- `type` — one of the defined types (see table below)
- `scope` — the module/area affected (e.g., `ui-components`, `shell`, `shared`, `deps`)
- `description` — imperative mood, present tense, no period at end, max ~72 chars

### Examples

```
feat(ui-components): add Button atom with CVA variants
fix(shell): resolve MF remote URL in production env
chore(deps): upgrade rspack to 1.3.0
refactor(shared): extract isLocalEnv to dedicated util
test(ui-components): add Input atom unit tests
build(nx): add prebuild:wc target for web components
docs(readme): update setup instructions for Bun
style(shell): fix indentation in app.component.ts
ci(github-actions): add Nx affected cache step
perf(shared): memoize heavy computation in data util
```

## Commit Types Reference

| Type       | Purpose                                    | Example scope        |
|------------|--------------------------------------------|----------------------|
| `feat`     | New feature for the user                   | `ui-components`, `shell` |
| `fix`      | Bug fix for the user                       | `shell`, `shared`    |
| `docs`     | Documentation only changes                 | `readme`, `api`      |
| `style`    | Formatting, whitespace (no logic change)   | any                  |
| `refactor` | Code change that is neither feat nor fix   | `shared`, `core`     |
| `test`     | Adding or correcting tests                 | `ui-components`      |
| `chore`    | Tooling, config, build scripts, deps       | `deps`, `config`     |
| `build`    | Build system or external dependency change | `nx`, `rspack`       |
| `ci`       | CI/CD configuration changes                | `github-actions`     |
| `perf`     | Performance improvement                    | `shared`, `core`     |

## lefthook.yml Pattern

```yaml
pre-commit:
  parallel: true
  jobs:
    - name: lint
      glob: "*.{js,ts,jsx,tsx}"
      run: bun run lint:fix {staged_files}

    - name: format
      glob: "*.{js,ts,jsx,tsx,json,md}"
      run: bun run format:fix {staged_files}

commit-msg:
  jobs:
    - name: commitlint
      run: bunx commitlint --edit {1}
```

Key patterns:
- `parallel: true` — lint and format run concurrently in `pre-commit`
- `glob` — hooks only fire on matching file types
- `{staged_files}` — Lefthook injects only the staged files, keeping hooks fast
- `{1}` — the path to the commit message temp file (standard for `commit-msg`)

## Commands

```bash
# Install hooks after cloning (required)
bunx lefthook install

# Test hooks manually without committing
bunx lefthook run pre-commit
bunx lefthook run commit-msg

# Run a specific job within a hook
bunx lefthook run pre-commit --jobs lint

# Uninstall hooks
bunx lefthook uninstall
```

## Skipping Hooks (Emergency Only)

```bash
git commit --no-verify -m "chore: emergency fix"
```

Use `--no-verify` ONLY when:
- The hooks themselves are broken (e.g., missing binary, config error)
- CI is down and you need an unblocking commit

NEVER use `--no-verify` to bypass commit message conventions — the convention enforcement exists for a reason (changelog generation, semantic versioning, blame clarity).

## Debugging Hook Failures

```bash
# See verbose output from hooks
LEFTHOOK_VERBOSE=true git commit -m "..."

# Check hook is installed
cat .git/hooks/commit-msg

# Re-install if hooks are missing
bunx lefthook install
```

## commitlint.config.js

```js
module.exports = {
  extends: ["@commitlint/config-conventional"]
};
```

This uses the standard `@commitlint/config-conventional` ruleset — no custom overrides in this project.
