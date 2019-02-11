module.exports = {
    ...require('../jest.config'),
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.esnext.umd.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/esnext/umd$1"
    }  
};
