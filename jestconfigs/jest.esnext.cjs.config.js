module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.esnext.cjs.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/targets/esnext/cjs$1"
  }
};
