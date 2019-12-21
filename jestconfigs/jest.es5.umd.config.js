module.exports = {
    ...require('../jest.config'),
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "spec/tsconfig/tsconfig.es5.umd.json"
        }
    },
    "moduleNameMapper": {
        "^ix/asynciterable/operators(.*)": "<rootDir>/targets/es5/umd/Ix.dom.asynciterable.operators.js",
        "^ix/asynciterable(.*)": "<rootDir>/targets/es5/umd/Ix.dom.asynciterable.js",
        "^ix/iterable/operators(.*)": "<rootDir>/targets/es5/umd/Ix.dom.iterable.operators.js",
        "^ix/iterable(.*)": "<rootDir>/targets/es5/umd/Ix.dom.iterable.js",
        "^ix(.*)": "<rootDir>/targets/es5/umd/Ix.dom.js"
    }  
};
