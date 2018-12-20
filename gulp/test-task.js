// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

const path = require('path');
const { argv } = require('./argv');
const child_process = require(`child_process`);
const { memoizeTask } = require('./memoize-task');

const jestArgv = [];
argv.verbose && jestArgv.push(`--verbose`);
argv.coverage
    ? jestArgv.push(`-c`, `jest.coverage.config.js`, `--coverage`)
    : jestArgv.push(`-c`, `jest.config.js`, ...(process.env.IS_APPVEYOR_CI ? [] : [`-i`]))

const jest = path.join(path.parse(require.resolve(`jest`)).dir, `../bin/jest.js`);
const testOptions = {
    stdio: [`ignore`, `inherit`, `inherit`],
    env: {
        ...process.env,
        // hide fs.promises/stream[Symbol.asyncIterator] warnings
        NODE_NO_WARNINGS: `1`,
        // prevent the user-land `readable-stream` module from
        // patching node's streams -- they're better now
        READABLE_STREAM: `disable`
    },
};

const testTask = ((cache, execArgv, testOptions) => memoizeTask(cache, function test(target, format) {
    const args = [...execArgv];
    const opts = { ...testOptions };
    if (!argv.coverage) {
        args.push(`spec/*`);
    }
    opts.env = { ...opts.env,
        TEST_TARGET: target,
        TEST_MODULE: format,
        TEST_DOM_STREAMS: (target ==='src' || format === 'umd').toString(),
        TEST_NODE_STREAMS: (target ==='src' || format !== 'umd').toString(),
        TEST_TS_SOURCE: !!argv.coverage || (target === 'src') || (opts.env.TEST_TS_SOURCE === 'true')
    };
    return child_process.spawn(`node`, args, opts);
}))({}, [jest, ...jestArgv], testOptions);

module.exports = testTask;
module.exports.testTask = testTask;
