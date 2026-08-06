# mrodgersjs-web

[![npm](https://img.shields.io/badge/npm-mrodgersjs-web-blue)](https://www.npmjs.com/package/mrodgersjs-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Install **Mike Rodgers** as a local Forward Deployed Engineer teammate.

This CLI ships a small, dependency-free binary that brings Mike's operating principles, gate discipline, and proof-first verification mindset into any repository.

## Install

```bash
npx mrodgersjs-web
```

No global install required. `npx` downloads the package and runs it once.

## Usage

```bash
# Interactive welcome + skill tree
npx mrodgersjs-web

# Ask Mike a question about gates, proof, autonomy, or deployment
npx mrodgersjs-web --ask "how do I verify a build?"

# Print the six operating principles
npx mrodgersjs-web --audit

# Print the flagship clone command
npx mrodgersjs-web --deploy

# Show version
npx mrodgersjs-web --version
```

## Career as a Package

`mrodgersjs-web` treats a career as an installable artifact. Instead of a static resume, you get a teammate that:

- answers questions from a bundled knowledge base of real projects (`proof-studio`, `rigforge`, `jake-studio`);
- surfaces gate discipline before any outward action;
- refuses fake-done claims with proof-first verification;
- ships with zero runtime dependencies so it works anywhere Node 18+ runs.

## Knowledge Base

The `data/knowledge.json` file contains 15-20 entries across five categories:

- `gates` — Gate-D, approval flows, fail-closed behavior
- `proof` — ProofPacket format, signature checks, false-done detection
- `autonomy` — earned autonomy, operator-owned decisions, kill criteria
- `deployment` — flagship clone workflow, verify-before-ship
- `principles` — the six operating principles

## License

MIT © Mike Rodgers
