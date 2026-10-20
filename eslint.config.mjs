// ESLint v9 flat config for mrodgersjs-web.
//
// Scope: the CLI entrypoint and the test module only. The bundled
// knowledge JSON and docs/Markdown are out of scope.
import js from '@eslint/js';

export default [
  {
    ignores: [
      'node_modules/**',
      'data/knowledge.json',
      'assets/**',
      'docs/**',
      '*.cff',
      '.github/**',
      'scripts/**',
      'mcp/**',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
      },
    },
    rules: {
      // The CLI prints synchronously and reads argv synchronously; that is
      // the contract, not a bug. Keep process.exitCode assignment as a
      // test surface.
      'no-process-exit': 'off',
      'no-console': 'off',
      // Project policy: do not invent credentials or PII in tests.
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
