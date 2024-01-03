import config from '../jest.config.js';

export default {
  ...config,
  rootDir: '../',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^ix(.*)': '<rootDir>/targets/esnext/cjs$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    ...config.transform,
    '^.+\\.js$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: '<rootDir>/spec/tsconfig/tsconfig.esnext.cjs.json',
      },
    ],
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: '<rootDir>/spec/tsconfig/tsconfig.esnext.cjs.json',
      },
    ],
  },
};
