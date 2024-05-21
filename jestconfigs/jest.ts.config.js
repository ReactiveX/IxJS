import config from '../jest.config.js';

export default {
    ...config,
    rootDir: '../',
    moduleNameMapper: {
        '^ix$': '<rootDir>/targets/ts/Ix.node',
        '^ix(.*)\\.js$': '<rootDir>/targets/ts$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        ...config.transform,
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.ts.json',
                useESM: true,
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: '<rootDir>/spec/tsconfig/tsconfig.ts.json',
                useESM: true,
            },
        ],
    },
};
