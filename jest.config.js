export default {
    verbose: false,
    testEnvironment: 'node',
    rootDir: '.',
    roots: [
        '<rootDir>/spec/',
    ],
    cacheDirectory: '.jest-cache',
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['js', 'mjs', 'ts'],
    coverageProvider: 'v8',
    coverageReporters: ['lcov', 'json', ['text', { skipFull: true }]],
    coveragePathIgnorePatterns: [
        'spec\\/.*\\.(ts|js)$',
        '/node_modules/',
    ],
    moduleNameMapper: {
        '^ix$': '<rootDir>/src/Ix.node',
        '^ix(.*)': '<rootDir>/src$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testRegex: '(.*(-|\\.)spec)\\.(ts|js)$',
    transform: {
        '^.+\\.js$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: 'spec/tsconfig.json',
                useESM: true,
            },
        ],
        '^.+\\.ts$': [
            'ts-jest',
            {
                diagnostics: false,
                tsconfig: 'spec/tsconfig.json',
                useESM: true,
            },
        ],
    },
    transformIgnorePatterns: [
        '/targets/(es5|es2015|esnext|ix)/',
        '/node_modules/(?!@openpgp/web-stream-tools)/',
    ],
};
