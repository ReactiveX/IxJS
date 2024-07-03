import config from '../jest.config.js';

export default {
    ...config,
    rootDir: '../',
    moduleFileExtensions: ['js', 'ts'],
    moduleNameMapper: {
        '^ix/asynciterable/operators(.*)': '<rootDir>/targets/esnext/umd/asynciterable/operators.js',
        '^ix/iterable/operators(.*)': '<rootDir>/targets/esnext/umd/iterable/operators.js',
        '^ix/asynciterable(.*)': '<rootDir>/targets/esnext/umd/asynciterable.js',
        '^ix/iterable(.*)': '<rootDir>/targets/esnext/umd/iterable.js',
        '^ix': '<rootDir>/targets/esnext/umd/dom.js',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        ...config.transform,
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.esnext.umd.json',
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.esnext.umd.json',
            },
        ],
    },
};
