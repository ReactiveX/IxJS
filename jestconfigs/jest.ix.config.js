module.exports = {
    ...require('../jest.config'),
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
