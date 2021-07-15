module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.es5.esm.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/es5/esm$1"
    }
};
