module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.es2015.esm.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/es2015/esm$1"
  }
};
