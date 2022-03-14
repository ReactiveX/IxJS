module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.es2015.cjs.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/es2015/cjs$1"
  }
};
