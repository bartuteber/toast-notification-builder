/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.spec.ts'],

  // Mirror the `@/` path alias from tsconfig so imports resolve the same way.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Polyfills that must run before the test framework loads (crypto.randomUUID).
  setupFiles: ['<rootDir>/jest.setup.cjs'],

  // Use babel-jest to transform TypeScript files, so we can use the same
  transform: {
    '^.+\\.ts$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
}
