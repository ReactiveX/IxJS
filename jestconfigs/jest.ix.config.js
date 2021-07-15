module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.ix.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/ix$1"
    }
};
