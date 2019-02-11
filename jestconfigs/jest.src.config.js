module.exports = {
    ...require('../jest.config'),
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "tsConfig": "<rootDir>/spec/tsconfig/tsconfig.src.json"
        }
    },
    "moduleNameMapper": {
        "^ix(.*)": "<rootDir>/src$1"
    }
};
