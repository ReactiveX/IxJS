module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.es5.esm.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/es5/esm$1"
  }
};
