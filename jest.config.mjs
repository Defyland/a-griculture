export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^styled-components': '<rootDir>/src/__mocks__/styled-components.js'
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useESM: true,
    }],
    '^.+\\.mjs$': ['babel-jest', { configFile: './babel.config.cjs' }],
    '^.+\\.js$': ['babel-jest', { configFile: './babel.config.cjs' }],
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/**/*.styles.tsx',
    '!src/**/*.types.ts',
    '!src/**/*.types.tsx',
    '!src/**/styles/**',
    '!src/**/types/**',
    '!src/styles/**',
    '!src/setupTests.ts',
    '!src/__mocks__/**',
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(@testing-library|@jest)/)"
  ]
}; 