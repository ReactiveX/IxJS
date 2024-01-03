import config from '../jest.config.js';

export default {
  ...config,
  rootDir: "../",
  moduleNameMapper: {
    "^ix/asynciterable/operators(.*)": "<rootDir>/targets/es5/umd/Ix.dom.asynciterable.operators.js",
    "^ix/asynciterable(.*)": "<rootDir>/targets/es5/umd/Ix.dom.asynciterable.js",
    "^ix/iterable/operators(.*)": "<rootDir>/targets/es5/umd/Ix.dom.iterable.operators.js",
    "^ix/iterable(.*)": "<rootDir>/targets/es5/umd/Ix.dom.iterable.js",
    "^ix(.*)": "<rootDir>/targets/es5/umd/Ix.dom.js",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    ...config.transform,
    "^.+\\.js$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: "<rootDir>/spec/tsconfig/tsconfig.es5.umd.json",
      },
    ],
    "^.+\\.ts$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: "<rootDir>/spec/tsconfig/tsconfig.es5.umd.json",
      },
    ],
  },
};
