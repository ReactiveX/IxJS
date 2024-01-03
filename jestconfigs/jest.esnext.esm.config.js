import config from '../jest.config.js';

export default {
  ...config,
  rootDir: "../",
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: {
    "^ix(.*)": "<rootDir>/targets/esnext/esm$1",
    "tslib": "tslib/tslib.es6.js",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    ...config.transform,
    "^.+\\.js$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: "<rootDir>/spec/tsconfig/tsconfig.esnext.esm.json",
        useESM: true,
      },
    ],
    "^.+\\.ts$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: "<rootDir>/spec/tsconfig/tsconfig.esnext.esm.json",
        useESM: true,
      },
    ],
  },
};
