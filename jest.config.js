module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    "collectCoverage": true,
    "coverageReporters": ["json", "html"],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };