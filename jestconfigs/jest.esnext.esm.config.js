module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.esnext.esm.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/esnext/esm$1"
  }
};
