# Copilot instructions

## What this repo is

`mrodgersjs-web-teammate` installs Mike Rodgers as a local Forward Deployed
Engineering teammate: a dependency-light Node CLI (`mrodgersjs-web`) backed by a
bundled knowledge file (`data/knowledge.json`). The CLI is rule-based, so two
runs on the same input give the same answer and it works offline, on a plane,
with no API key.

## Layout

- `bin/cli.js` - the CLI entry point (the only runtime module).
- `data/knowledge.json` - the bundled knowledge base the CLI reads.
- `test/` - `node --test` suite: CLI surface, search scoring, help and banner,
  lockfile, repo hygiene.
- `eslint.config.mjs` - ESLint v9 flat config for `bin/` and `test/`.
- `docs/` - architecture notes.
- `.github/workflows/` - `ci.yml` (Node matrix, lint, tests) and `rig-lattice.yml`.

## Commands

Run from the repository root with Node 18 or newer:

```bash
npm ci            # clean install from package-lock.json
npm test          # full test suite, node --test test/*.test.js
npx eslint .      # lint the whole tree
npm run lint      # same lint, scoped to bin/ and test/
npm run check     # lint then test
```

## Conventions

- Conventional commit messages: `feat:`, `fix:`, `test:`, `docs:`, `ci:`, `chore:`.
- Every behavior change lands with a test that exercises it and passes after a
  clean `npm ci`.
- Keep the package ESM (`"type": "module"`); no new runtime dependencies without
  a reason written down in the commit.
- No secrets, credentials, client PII or invented data in code, fixtures, docs or
  the knowledge file. No machine paths such as `/Users/...` or `~/Developer/...`.

## Truth rule

Any number in docs, comments, or commit messages must come from a command run in
this repository, for example a test count from `npm test`. Quote the command and
its output rather than a memory of it.
