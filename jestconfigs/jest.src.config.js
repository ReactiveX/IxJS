import config from '../jest.config.js';

export default {
  ...config,
  rootDir: '../',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^ix': '<rootDir>/src/Ix.node.ts',
    '^ix(.*)\\.js': '<rootDir>/src$1.ts',
    tslib: 'tslib/tslib.es6.js',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    ...config.transform,
    '^.+\\.js$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: '<rootDir>/spec/tsconfig/tsconfig.src.json',
        useESM: true,
      },
    ],
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: '<rootDir>/spec/tsconfig/tsconfig.src.json',
        useESM: true,
      },
    ],
  },
};
