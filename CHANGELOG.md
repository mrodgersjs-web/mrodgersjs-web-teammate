# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.2.0] - 2026-10-19

### Added
- ESLint v9 flat config (`eslint.config.mjs`) covering `bin/` and `test/`.
- `package.json` `scripts.lint` and `scripts.check` (`npm run lint`,
  `npm run check`).
- `package.json` dev dependency on `eslint` ^9.11.1 and `@eslint/js`.
- `package.json` repository fields: `bugs.url`, `homepage`,
  updated `author` and `repository.url`.
- `package.json` `files` list now ships `CHANGELOG.md`, `CODE_OF_CONDUCT.md`,
  and `CITATION.cff`.
- `test/tokenize.test.js` (4 tests): the search-scoring contract
  (Best match, Source, ID), the title-bonus behaviour, the
  "no matching insight" exit code, and the empty-`--ask` exit code.
- `test/help.test.js` (3 tests): the documented flags on `--help`,
  every one of the six operating principles in `--audit`, and the
  flagship clone command in `--deploy`.
- `test/cli.test.js` updated to expect the 0.2.0 version string.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`,
  `npm test`, and a CLI smoke (`--version`, `--help`) on Node 18, 20
  and 22.
- `.github/ISSUE_TEMPLATE/{bug_report,feature_request,config}.yml` and
  `.github/PULL_REQUEST_TEMPLATE.md` and `.github/dependabot.yml`.
- `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `CHANGELOG.md`
  (this file), and `CITATION.cff` (CFF 1.2.0).
- `docs/architecture.md` with the runtime architecture and the data
  contract.

### Changed
- Bumped version from 0.1.0 to 0.2.0.
- `scripts.test` resolves the test directory via the explicit
  `test/*.test.js` glob; a bare directory arg is treated as a module
  to load, not a discovery root, on Node 18+.
- `.github/workflows/smoke.yml` removed in favour of `ci.yml`.

## [0.1.0] - 2026-10-10

- Initial public release of the FDE teammate CLI plus the bundled
  knowledge base (`data/knowledge.json`, 18 entries across gates,
  proof, autonomy, deployment, and principles categories).
