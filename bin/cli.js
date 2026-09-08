#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
const knowledge = JSON.parse(readFileSync(join(__dirname, '..', 'data', 'knowledge.json'), 'utf8'));

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--ask') {
      flags.ask = args[i + 1] ?? '';
      i++;
    } else if (arg === '--audit') {
      flags.audit = true;
    } else if (arg === '--deploy') {
      flags.deploy = true;
    } else if (arg === '--version' || arg === '-v') {
      flags.version = true;
    } else if (arg === '--help' || arg === '-h') {
      flags.help = true;
    } else if (arg.startsWith('--ask=')) {
      flags.ask = arg.slice('--ask='.length);
    }
  }
  return flags;
}

function print(text) {
  console.log(text);
}

function banner() {
  return `
╔══════════════════════════════════════════════════════════════╗
║  mrodgersjs-web — Forward Deployed Engineer teammate         ║
║  Install Mike Rodgers into your repo and ship with gates.    ║
╚══════════════════════════════════════════════════════════════╝
`;
}

function welcome() {
  print(banner());
  print('Welcome. I operate as a local AI teammate with gate discipline.');
  print('');
  print('Skill tree:');
  print('  mrodgersjs-web --ask "how do I verify a build?"   Ask the knowledge base');
  print('  mrodgersjs-web --audit                            Print operating principles');
  print('  mrodgersjs-web --deploy                           Print flagship clone command');
  print('  mrodgersjs-web --version                          Show version');
  print('');
  print('Current status: ready. Gate-D armed.');
}

function showVersion() {
  print(pkg.version);
}

function showHelp() {
  print('Usage: node bin/cli.js [options]');
  print('');
  print('Options:');
  print('  --ask <question>   Search the bundled knowledge base for the best matching insight');
  print('  --audit            Print Mike\'s operating principles');
  print('  --deploy           Print the flagship clone command');
  print('  --version, -v      Show version');
  print('  --help, -h         Show this help message');
}

function audit() {
  print(banner());
  print('Mike Rodgers — Operating Principles');
  print('');
  const principles = knowledge.filter(k => k.category === 'principles');
  principles.forEach((p, idx) => {
    print(`${idx + 1}. ${p.title}`);
    print(`   ${p.text}`);
    print('');
  });
}

function deploy() {
  print('git clone https://github.com/mrodgersjs-web/proof-studio.git');
  print('cd proof-studio');
  print('./smoke.sh');
  print('# Verify the ProofPacket signature gate rejects forged BUILD COMPLETE messages.');
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function scoreEntry(entry, queryTokens) {
  const haystack = `${entry.title} ${entry.text} ${entry.category}`.toLowerCase();
  const hayTokens = tokenize(haystack);
  let score = 0;
  for (const q of queryTokens) {
    for (const h of hayTokens) {
      if (h === q) {
        score += 3;
      } else if (h.includes(q)) {
        score += 2;
      } else if (q.includes(h)) {
        score += 1;
      }
    }
  }
  if (entry.title.toLowerCase().includes(queryTokens.join(' '))) score += 5;
  return score;
}

function ask(question) {
  if (!question || question.trim() === '') {
    print('Usage: mrodgersjs-web --ask <question>');
    process.exitCode = 1;
    return;
  }
  const queryTokens = tokenize(question);
  const scored = knowledge
    .map(entry => ({ entry, score: scoreEntry(entry, queryTokens) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    print('No matching insight found in the knowledge base.');
    print('Try asking about gates, proof, deployment, autonomy, or principles.');
    process.exitCode = 1;
    return;
  }

  const best = scored[0].entry;
  print(`Best match: ${best.title} (${best.category})`);
  print('');
  print(best.text);
  print('');
  print(`Source: ${best.source_repo} · ID: ${best.id}`);
}

function main() {
  const flags = parseArgs(process.argv);

  if (flags.help) {
    showHelp();
    return;
  }
  if (flags.version) {
    showVersion();
    return;
  }
  if (flags.audit) {
    audit();
    return;
  }
  if (flags.deploy) {
    deploy();
    return;
  }
  if (flags.ask !== undefined) {
    ask(flags.ask);
    return;
  }

  welcome();
}

main();
