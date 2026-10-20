// Tests for the internal `tokenize` and search scoring helpers.

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

describe('search scoring', () => {
  it('returns a "Best match" line plus a Source and ID', () => {
    const output = run('--ask "what should I do when something fails"');
    assert.match(output, /Best match:/);
    assert.match(output, /Source: /);
    assert.match(output, /ID: /);
  });

  it('prefers an exact term match in the title', () => {
    const output = run('--ask "gate-d"');
    assert.match(output, /Best match:/);
    assert(output.includes('Gate-D'),
      `expected Gate-D to win the question, got: ${output.slice(0, 200)}`);
  });

  it('returns a "no matching insight" hint for unrelated terms', () => {
    let exitCode = 0;
    let output = '';
    try {
      run('--ask "zqxjkwmzvp"');
    } catch (err) {
      exitCode = err.status;
      output = String(err.stdout || '') + String(err.stderr || '');
    }
    assert.equal(exitCode, 1,
      `expected non-zero exit for unmatched question; got ${exitCode}: ${output}`);
    assert.match(output, /No matching insight/);
  });

  it('emits an exit code 1 on an empty --ask', () => {
    let exitCode = 0;
    try {
      run('--ask ""');
    } catch (err) {
      exitCode = err.status;
    }
    assert.equal(exitCode, 1, 'expected non-zero exit for empty --ask');
  });
});
