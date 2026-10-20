## What changed

<!-- One or two paragraphs describing the change. -->
<!-- List the user-visible behaviour change in one sentence first. -->

## How I verified

<!-- Paste the exact commands and their output. -->

- [ ] `npm install` completes cleanly
- [ ] `npm run lint` exits 0
- [ ] `npm test` reports the new test count and exits 0
- [ ] `node bin/cli.js --version` prints `0.2.0`
- [ ] If data/knowledge.json changed: `node bin/cli.js --ask <topic>` returns a sensible match

## Boundary impact

<!-- Public boundary check. -->

- [ ] No PII, secrets, customer data, or internal paths added
- [ ] No banned words (unlock, empower, synergy, leverage, disrupt, hustle,
  utilize, iterate, optimize) in the diff
- [ ] No machine paths like `/Users/...` or `~/Developer/...` left in tracked files
- [ ] No real model names, real agent names, or unapproved
  third-party names in CLI output
