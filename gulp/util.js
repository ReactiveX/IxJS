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

const fs = require('fs');
const path = require(`path`);
const pump = require(`stream`).pipeline;
const child_process = require(`child_process`);
const { targets, modules } = require('./argv');
const {
  ReplaySubject,
  empty: ObservableEmpty,
  throwError: ObservableThrow,
  fromEvent: ObservableFromEvent
} = require('rxjs');
const {
  merge,
  flatMap,
  takeUntil,
  defaultIfEmpty,
  multicast,
  refCount,
} = require('rxjs/operators');

const asyncDone = require('util').promisify(require('async-done'));

const mainExport = `Ix`;
const npmPkgName = `ix`;
const npmOrgName = `@reactivex`;

const releasesRootDir = `targets`;
const knownTargets = [`es5`, `es2015`, `esnext`];
const knownModules = [`cjs`, `esm`, `cls`, `umd`];
const tasksToSkipPerTargetOrFormat = {
  src: { clean: true, build: true },
  cls: { test: true, package: true }
};
const packageJSONFields = [
  `version`, `license`, `description`,
  `author`, `homepage`, `repository`,
  `bugs`, `keywords`, `dependencies`
];

const metadataFiles = [`LICENSE`, `readme.md`, `CHANGELOG.md`].map((filename) => {
  let err = false, prefixes = [`./`, `../`];
  let p = prefixes.find((prefix) => {
    try {
      fs.statSync(path.resolve(path.join(prefix, filename)));
    } catch (e) { return false; }
    return true;
  });
  if (!p) {
    throw new Error(`Couldn't find ${filename} in ./ or ../`);
  }
  return path.join(p, filename);
});

// see: https://github.com/google/closure-compiler/blob/c1372b799d94582eaf4b507a4a22558ff26c403c/src/com/google/javascript/jscomp/CompilerOptions.java#L2988
const gCCLanguageNames = {
  es5: `ECMASCRIPT5`,
  es2015: `ECMASCRIPT_2015`,
  es2016: `ECMASCRIPT_2016`,
  es2017: `ECMASCRIPT_2017`,
  esnext: `ECMASCRIPT_NEXT`
};

const UMDSourceTargets = {
  es5: `es5`,
  es2015: `es2015`,
  es2016: `es2015`,
  es2017: `es2015`,
  esnext: `esnext`
};

const terserLanguageNames = {
  es5: 5, es2015: 6,
  es2016: 7, es2017: 8,
  esnext: 8 // <--- ?
};

// ES7+ keywords Terser shouldn't mangle
// Hardcoded here since some are from ES7+, others are
// only defined in interfaces, so difficult to get by reflection.
const ESKeywords = [
  // GroupedIterable/GroupedAsyncIterable
  `key`,
  // PropertyDescriptors
  `configurable`, `enumerable`,
  // IteratorResult, Symbol.asyncIterator
  `done`, `value`, `Symbol.asyncIterator`, `asyncIterator`,
  // AsyncObserver
  `values`, `hasError`, `hasCompleted`, `errorValue`, `closed`,
  // Observable/Subscription/Scheduler
  `next`, `error`, `complete`, `subscribe`, `unsubscribe`, `isUnsubscribed`,
  // EventTarget
  `addListener`, `removeListener`, `addEventListener`, `removeEventListener`,
  // AbortController
  `AbortController`, `AbortSignal`, `AbortError`
];

function taskName(target, format) {
  return !format ? target : `${target}:${format}`;
}

function packageName(target, format) {
  return !format ? target : `${target}-${format}`;
}

function tsconfigName(target, format) {
  return !format ? target : `${target}.${format}`;
}

function targetDir(target, format) {
  return path.join(releasesRootDir, ...(!format ? [target] : [target, format]));
}

function shouldRunInChildProcess(target, format) {
  // If we're building more than one module/target, then yes run this task in a child process
  if (targets.length > 1 || modules.length > 1) { return true; }
  // If the target we're building *isn't* the target the gulp command was configured to run, then yes run that in a child process
  if (targets[0] !== target || modules[0] !== format) { return true; }
  // Otherwise no need -- either gulp was run for just one target, or we've been spawned as the child of a multi-target parent gulp
  return false;
}

const gulp = path.join(path.parse(require.resolve(`gulp`)).dir, `bin/gulp.js`);
function spawnGulpCommandInChildProcess(command, target, format) {
  const err = [];
  return asyncDone(() => {
    const child = child_process.spawn(
      `node`,
      [gulp, command, '-t', target, '-m', format, `-L`],
      {
        stdio: [`ignore`, `ignore`, `pipe`],
        env: { ...process.env, NODE_NO_WARNINGS: `1` }
      });
    child.stderr.on('data', (line) => err.push(line));
    return child;
  }).catch(() => Promise.reject(err.length > 0 ? err.join('\n')
    : `Error in "${command}:${taskName(target, format)}" task.`));
}

const logAndDie = (e) => { if (e) { console.error(e); process.exit(1) } };
function observableFromStreams(...streams) {
  if (streams.length <= 0) { return ObservableEmpty(); }
  const pumped = streams.length <= 1 ? streams[0] : pump(...streams, logAndDie);
  const fromEvent = ObservableFromEvent.bind(null, pumped);
  const streamObs = fromEvent(`data`).pipe(
    merge(fromEvent(`error`).pipe(flatMap((e) => ObservableThrow(e)))),
    takeUntil(fromEvent(`end`).pipe(merge(fromEvent(`close`)))),
    defaultIfEmpty(`empty stream`),
    multicast(new ReplaySubject()),
    refCount());
  streamObs.stream = pumped;
  streamObs.observable = streamObs;
  return streamObs;
}

function* combinations(_targets, _modules) {

  const targets = known(knownTargets, _targets || [`all`]);
  const modules = known(knownModules, _modules || [`all`]);

  if (_targets.indexOf(`src`) > -1) {
    yield [`src`, ``];
    return;
  }

  if (_targets.indexOf(`all`) > -1 && _modules.indexOf(`all`) > -1) {
    yield [`ts`, ``];
    yield [`src`, ``];
    yield [npmPkgName, ``];
  }

  for (const format of modules) {
    for (const target of targets) {
      yield [target, format];
    }
  }

  function known(known, values) {
    return ~values.indexOf(`all`) ? known
      : ~values.indexOf(`src`) ? [`src`]
        : Object.keys(
          values.reduce((map, arg) => ((
            (known.indexOf(arg) !== -1) &&
            (map[arg.toLowerCase()] = true)
            || true) && map
          ), {})
        ).sort((a, b) => known.indexOf(a) - known.indexOf(b));
  }
}

const esmRequire = require(`esm`)(module, {
  mode: `auto`,
  cjs: {
    /* A boolean for storing ES modules in require.cache. */
    cache: true,
    /* A boolean for respecting require.extensions in ESM. */
    extensions: true,
    /* A boolean for __esModule interoperability. */
    interop: true,
    /* A boolean for importing named exports of CJS modules. */
    namedExports: true,
    /* A boolean for following CJS path rules in ESM. */
    paths: true,
    /* A boolean for __dirname, __filename, and require in ESM. */
    vars: true,
  }
});

const getUMDExportName = (umdEntryFileName) => umdEntryFileName
  .split('.')
  .filter((x) => x != 'dom')
  .map((x) => x[0].toUpperCase() + x.slice(1))
  .join('');

module.exports = {

  mainExport, npmPkgName, npmOrgName, metadataFiles, packageJSONFields,

  knownTargets, knownModules, tasksToSkipPerTargetOrFormat,
  gCCLanguageNames, UMDSourceTargets, terserLanguageNames,

  taskName, packageName, tsconfigName, targetDir, combinations, observableFromStreams,
  ESKeywords, esmRequire, shouldRunInChildProcess, spawnGulpCommandInChildProcess, getUMDExportName,

  targetAndModuleCombinations: [...combinations(targets, modules)]
};
