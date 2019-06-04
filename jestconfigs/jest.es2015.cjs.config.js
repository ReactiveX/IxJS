module.exports = {
    ...require('../jest.config'),
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.es2015.cjs.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/targets/es2015/cjs$1"
    }  
};
