// npm ci refuses to install when package-lock.json disagrees with package.json.
// This test fails fast with a readable message instead of a CI install error.
import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';

const read = (name) => JSON.parse(readFileSync(new URL(`../${name}`, import.meta.url), 'utf8'));
const pkg = read('package.json');
const lock = read('package-lock.json');

test('package-lock.json root devDependencies match package.json', () => {
  assert.deepStrictEqual(lock.packages[''].devDependencies, pkg.devDependencies);
});

test('package-lock.json root dependencies match package.json', () => {
  assert.deepStrictEqual(lock.packages[''].dependencies || {}, pkg.dependencies || {});
});
