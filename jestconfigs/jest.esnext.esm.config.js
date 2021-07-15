module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.esnext.esm.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/esnext/esm$1"
    }
};
