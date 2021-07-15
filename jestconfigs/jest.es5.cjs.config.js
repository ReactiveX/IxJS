module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.es5.cjs.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/es5/cjs$1"
    }
};
