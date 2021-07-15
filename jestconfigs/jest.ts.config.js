module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "<rootDir>/spec/tsconfig/tsconfig.ts.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/ts$1"
    }
};
