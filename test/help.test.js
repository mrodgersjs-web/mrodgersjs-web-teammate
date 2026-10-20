// Tests for the help and banner surfaces.

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

describe('help and banner', () => {
  it('--help lists the documented flags', () => {
    const output = run('--help');
    assert(output.includes('--ask'));
    assert(output.includes('--audit'));
    assert(output.includes('--deploy'));
    assert(output.includes('--version'));
  });

  it('--audit prints the banner and the six principles', () => {
    const output = run('--audit');
    assert(output.includes('Operating Principles'));
    for (const principle of [
      'Correctness First, Then Clarity',
      'Fix at the Source',
      'Evidence Before Claims',
      'No Outward Action Without Approval',
      'Never Yield on Red',
      'Own the Decomposition',
    ]) {
      assert(output.includes(principle), `missing principle: ${principle}`);
    }
  });

  it('--deploy prints the flagship clone command', () => {
    const output = run('--deploy');
    assert.match(output, /git clone https:\/\/github\.com\/mrodgersjs-web\/proof-studio\.git/);
    assert.match(output, /smoke\.sh/);
  });
});
