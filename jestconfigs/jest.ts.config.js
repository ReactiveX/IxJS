module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.ts.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/ts$1"
  }
};
