module.exports = {
  ...require('../jest.config'),
  "rootDir": "../",
  "globals": {
    "ts-jest": {
      "diagnostics": false,
      "tsconfig": "<rootDir>/spec/tsconfig/tsconfig.src.json"
    }
  },
  "moduleNameMapper": {
    "^ix(.*)": "<rootDir>/src$1"
  }
};
