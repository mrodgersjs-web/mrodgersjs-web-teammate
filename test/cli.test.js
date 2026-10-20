import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cli = join(__dirname, '..', 'bin', 'cli.js');

function run(args = '') {
  return execSync(`node ${cli} ${args}`, { encoding: 'utf8' });
}

describe('mrodgersjs-web CLI', () => {
  it('--version prints the version', () => {
    const output = run('--version');
    assert.match(output, /^0\.2\.0/);
  });

  it('--audit prints the operating principles', () => {
    const output = run('--audit');
    assert(output.includes('Operating Principles'));
    assert(output.includes('Correctness First, Then Clarity'));
    assert(output.includes('Fix at the Source'));
    assert(output.includes('Evidence Before Claims'));
    assert(output.includes('No Outward Action Without Approval'));
    assert(output.includes('Never Yield on Red'));
    assert(output.includes('Own the Decomposition'));
  });

  it('--ask returns the best matching insight', () => {
    const output = run('--ask "how do I verify a build is done"');
    assert(output.includes('Best match:'));
    assert(output.includes('Source:'));
    assert(output.includes('ID:'));
  });

  it('--ask works with --ask=key=value style', () => {
    const output = run('--ask=gate');
    assert(output.includes('Best match:'));
  });

  it('no arguments prints the interactive welcome and skill tree', () => {
    const output = run('');
    assert(output.includes('mrodgersjs-web'));
    assert(output.includes('Welcome.'));
    assert(output.includes('Skill tree:'));
    assert(output.includes('--ask'));
    assert(output.includes('--audit'));
    assert(output.includes('--deploy'));
    assert(output.includes('Gate-D armed.'));
  });
});
