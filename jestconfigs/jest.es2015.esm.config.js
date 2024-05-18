import config from '../jest.config.js';

export default {
    ...config,
    rootDir: '../',
    moduleNameMapper: {
        '^ix(.*)': '<rootDir>/targets/es2015/esm$1',
        tslib: 'tslib/tslib.es6.js',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        ...config.transform,
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.es2015.esm.json',
                useESM: true,
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.es2015.esm.json',
                useESM: true,
            },
        ],
    },
};
