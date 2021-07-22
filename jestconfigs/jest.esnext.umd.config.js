module.exports = {
    ...require('../jest.config'),
    "rootDir": "../",
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "<rootDir>/spec/tsconfig/tsconfig.esnext.umd.json"
        }
    },
    "moduleNameMapper": {
        "^ix/asynciterable/operators(.*)": "<rootDir>/targets/esnext/umd/Ix.dom.asynciterable.operators.js",
        "^ix/asynciterable(.*)": "<rootDir>/targets/esnext/umd/Ix.dom.asynciterable.js",
        "^ix/iterable/operators(.*)": "<rootDir>/targets/esnext/umd/Ix.dom.iterable.operators.js",
        "^ix/iterable(.*)": "<rootDir>/targets/esnext/umd/Ix.dom.iterable.js",
        "^ix(.*)": "<rootDir>/targets/esnext/umd/Ix.dom.js"
    }
};
