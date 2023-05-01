module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: ['src/**/*.ts?(x)', '!src/**/*.d.ts'],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };