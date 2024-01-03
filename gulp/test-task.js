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

import * as path from 'path';
import { argv } from './argv.js';
import child_process from 'child_process';
import { memoizeTask } from './memoize-task.js';
import { npmPkgName, targetAndModuleCombinations } from './util.js';
import {promisify} from 'util';
import asyncDone_ from 'async-done';
const asyncDone = promisify(asyncDone_);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jestArgv = [`--reporters=jest-silent-reporter`];

if (argv.verbose) {
  jestArgv.push(`--verbose`);
}

if (targetAndModuleCombinations.length > 1) {
  jestArgv.push(`--detectOpenHandles`, `--no-cache`);
}

const jest = path.join(path.parse(require.resolve(`jest`)).dir, `../bin/jest.js`);
const testOptions = {
  stdio: [`ignore`, `inherit`, `inherit`],
  env: {
    ...process.env,
    // hide fs.promises/stream[Symbol.asyncIterator] warnings
    NODE_NO_WARNINGS: `1`,
    // TS_JEST_DISABLE_VER_CHECKER: true
  },
};

export const testTask = ((cache, execArgv, testOptions) => memoizeTask(cache, function test(target, format) {
  const args = [...execArgv];
  const opts = { ...testOptions };
  if (format === 'esm' || target === 'ts' || target === 'src' || target === npmPkgName) {
    args.unshift(`--experimental-vm-modules`);
  }
  if (argv.coverage) {
    args.push(`-c`, `jest.coverage.config.js`, `--coverage`);
  } else {
    const cfgname = [target, format].filter(Boolean).join('.');
    // args.push(`--verbose`, `--no-cache`, `-i`);
    args.push(`-c`, `jestconfigs/jest.${cfgname}.config.js`, ...argv.tests);
  }
  opts.env = {
    ...opts.env,
    TEST_DOM_STREAMS: (target === 'src' || format === 'umd').toString(),
    TEST_NODE_STREAMS: (target === 'src' || format !== 'umd').toString(),
  };
  return asyncDone(() => child_process.spawn(`node`, args, opts));
}))({}, [jest, ...jestArgv], testOptions);

export default testTask;
