import config from '../jest.config.js';

export default {
    ...config,
    rootDir: '../',
    moduleFileExtensions: ['js', 'ts'],
    moduleNameMapper: {
        '^ix/asynciterable/operators(.*)': '<rootDir>/targets/es2015/umd/asynciterable/operators.js',
        '^ix/iterable/operators(.*)': '<rootDir>/targets/es2015/umd/iterable/operators.js',
        '^ix/asynciterable(.*)': '<rootDir>/targets/es2015/umd/asynciterable.js',
        '^ix/iterable(.*)': '<rootDir>/targets/es2015/umd/iterable.js',
        '^ix': '<rootDir>/targets/es2015/umd/dom.js',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        ...config.transform,
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.es2015.umd.json',
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.es2015.umd.json',
            },
        ],
    },
};
