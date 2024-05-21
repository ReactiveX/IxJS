import path from 'node:path';
import { argv } from './argv.js';
import { promisify } from 'node:util';
import child_process from 'node:child_process';
import { memoizeTask } from './memoize-task.js';
import asyncDoneSync from 'async-done';
const asyncDone = promisify(asyncDoneSync);
import { targetAndModuleCombinations, npmPkgName } from './util.js';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const jestArgv = [];

if (argv.verbose) {
    jestArgv.push(`--verbose`);
} else {
    jestArgv.push(`--reporters=jest-silent-reporter`);
}

if (targetAndModuleCombinations.length > 1) {
    jestArgv.push(`--detectOpenHandles`);
}

const jest = path.join(path.parse(require.resolve(`jest`)).dir, `../bin/jest.js`);
const testOptions = {
    stdio: [`ignore`, `inherit`, `inherit`],
    env: {
        ...process.env,
        // hide fs.promises/stream[Symbol.asyncIterator] warnings
        NODE_NO_WARNINGS: `1`,
    },
};

export const testTask = ((cache, execArgv, testOptions) => memoizeTask(cache, function test(target, format) {
    const opts = { ...testOptions };
    const args = [...execArgv];
    if (format === 'esm' || target === 'ts' || target === 'src' || target === npmPkgName) {
        args.unshift(`--experimental-vm-modules`);
    }
    if (argv.coverage) {
        args.push(`-c`, `jestconfigs/jest.coverage.config.js`);
    } else {
        const cfgname = [target, format].filter(Boolean).join('.');
        args.push(`-c`, `jestconfigs/jest.${cfgname}.config.js`);
    }
    args.push(...(argv._unknown || []));
    args.push(...argv.tests);
    opts.env = {
        ...opts.env,
        TEST_TARGET: target,
        TEST_MODULE: format,
        TEST_DOM_STREAMS: (target === 'src' || format === 'umd').toString(),
        TEST_NODE_STREAMS: (target === 'src' || format !== 'umd').toString(),
        TEST_TS_SOURCE: !!argv.coverage || (target === 'src') || (opts.env.TEST_TS_SOURCE === 'true')
    };
    return asyncDone(() => child_process.spawn(`node`, args, opts));
}))({}, [jest, ...jestArgv], testOptions);
