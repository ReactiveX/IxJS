import config from '../jest.config.js';

export default {
    ...config,
    rootDir: '../',
    moduleFileExtensions: ['js', 'ts'],
    moduleNameMapper: {
        '^ix(.*)': '<rootDir>/targets/ix$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        ...config.transform,
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.ix.json',
                useESM: true,
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.ix.json',
                useESM: true,
            },
        ],
    },
};
