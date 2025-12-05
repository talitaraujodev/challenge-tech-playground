/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFiles: [
    "<rootDir>/tests/config.ts"
  ],
  globals: {
    "ts-jest": {
      "compiler": "ttypescript"
    }
  },
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
};
