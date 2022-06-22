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

const {
    targetDir,
    mainExport,
    esmRequire,
    getUMDExportName,
    gCCLanguageNames,
    observableFromStreams,
    shouldRunInChildProcess,
    spawnGulpCommandInChildProcess,
} = require('./util');

const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const mkdirp = require('mkdirp');
const sourcemaps = require('gulp-sourcemaps');
const { memoizeTask } = require('./memoize-task');
const closureCompiler = require('google-closure-compiler').gulp();

const closureTask = ((cache) => memoizeTask(cache, async function closure(target, format) {

    if (shouldRunInChildProcess(target, format)) {
        return spawnGulpCommandInChildProcess('compile', target, format);
    }

    const src = targetDir(target, `cls`);
    const out = targetDir(target, format);

    await mkdirp(out);

    await Promise.all([
        `${mainExport}.dom`,
        `${mainExport}.dom.iterable`,
        `${mainExport}.dom.asynciterable`,
        `${mainExport}.dom.iterable.operators`,
        `${mainExport}.dom.asynciterable.operators`
    ].map(closureCompile));

    async function closureCompile(entry) {

        const entry_point = path.join(src, `${entry}.dom.cls.js`);
        const externsPath = path.join(out, `${entry}.externs.js`);

        await Promise.all([
            fs.promises.writeFile(entry_point, generateUMDExportAssignment(entry)),
            fs.promises.writeFile(externsPath, generateExternsFile(path.resolve(`${src}/${entry}.js`)))
        ]);

        return await observableFromStreams(
            gulp.src([
                /* external libs first */
                `node_modules/tslib/package.json`,
                `node_modules/tslib/tslib.es6.js`,
                `node_modules/rxjs/package.json`,
                `node_modules/rxjs/util/root.js`,
                `node_modules/rxjs/internal/symbol/observable.js`,
                `${src}/**/*.js` /* <-- then sources globs  */
            ], { base: `./` }),
            sourcemaps.init(),
            closureCompiler(createClosureArgs(target, entry_point, entry, externsPath, getUMDExportName(entry)), {
                platform: ['native', 'java', 'javascript']
            }),
            // rename the sourcemaps from *.js.map files to *.min.js.map
            sourcemaps.write(`.`, { mapFile: (mapPath) => mapPath.replace(`.js.map`, `.${target}.min.js.map`) }),
            gulp.dest(out)
        ).toPromise();
    }
}))({});

const createClosureArgs = (target, entry_point, output, externs, libraryName) => ({
    externs,
    entry_point,
    third_party: true,
    warning_level: `QUIET`,
    dependency_mode: `PRUNE`,
    rewrite_polyfills: false,
    module_resolution: `NODE`,
    // formatting: `PRETTY_PRINT`,
    // debug: true,
    compilation_level: `ADVANCED`,
    process_common_js_modules: true,
    package_json_entry_names: `module,jsnext:main,main`,
    assume_function_wrapper: true,
    js_output_file: `${output}.js`,
    language_in: gCCLanguageNames[`esnext`],
    language_out: gCCLanguageNames[target],
    output_wrapper: `(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['${libraryName}'], factory) :
    (factory(global.${libraryName} = global.${libraryName} || {}));
}(this, (function (exports) {%output%}.bind(this))));`
});

module.exports = closureTask;
module.exports.closureTask = closureTask;

function generateUMDExportAssignment(entry) {
    return [`
import { __await } from 'tslib';
__await.prototype[Symbol.toStringTag] = '__await';
Object.defineProperty(__await, Symbol.hasInstance, {
  writable: true, configurable: true, value(inst) {
    return !!(inst && inst[Symbol.toStringTag] === '__await');
  }
});`,
        `import * as exports0 from './${entry}';`,
        'Object.assign(arguments[0], exports0);'
    ].join('\n');
}

function generateExternsFile(entryModulePath) {
    const entryModule = esmRequire(entryModulePath, { warnings: false });
    return [
        externsHeader(),
        ...getPublicExportedNames(entryModule)
            .map(externBody).filter(Boolean)
    ].join('\n');
}

function externBody({ exportName, staticNames, instanceNames }) {
    return [
        `var ${exportName} = function() {};`,
        staticNames.map((staticName) => (isNaN(+staticName)
            ? `/** @type {?} */\n${exportName}.${staticName} = function() {};`
            : `/** @type {?} */\n${exportName}[${staticName}] = function() {};`
        )).join('\n'),
        instanceNames.map((instanceName) => (isNaN(+instanceName)
            ? `/** @type {?} */\n${exportName}.prototype.${instanceName};`
            : `/** @type {?} */\n${exportName}.prototype[${instanceName}];`
        )).join('\n')
    ].filter(Boolean).join('\n');
}

function externsHeader() {
    return (`
// @ts-nocheck
/**
 * @fileoverview Closure Compiler externs for Ix
 * @externs
 * @suppress {duplicate,checkTypes}
 */
/** @type {symbol} */
Symbol.iterator;
/** @type {symbol} */
Symbol.observable;
/** @type {symbol} */
Symbol.asyncIterator;
/** @type {symbol} */
var symbolObservable = function() {};
`);
}

// Reflect on the Ix entrypoint module to build the closure externs file.
// Assume all the non-inherited static and prototype members of the Ix entrypoint
// and its direct exports are public, and should be preserved through minification.
function getPublicExportedNames(entryModule) {
    const fn = function() {};
    const isStaticOrProtoName = (x) => (
        !(x in fn) &&
        (x !== `default`) &&
        (x !== `undefined`) &&
        (x !== `__esModule`) &&
        (x !== `constructor`)
    );
    return Object
        .getOwnPropertyNames(entryModule)
        .filter((name) => name !== 'default')
        .filter((name) => (
            typeof entryModule[name] === `object` ||
            typeof entryModule[name] === `function`
        ))
        .map((name) => [name, entryModule[name]])
        .reduce((reserved, [name, value]) => {

            const staticNames = value &&
                typeof value === 'object' ? Object.getOwnPropertyNames(value).filter(isStaticOrProtoName) :
                typeof value === 'function' ? Object.getOwnPropertyNames(value).filter(isStaticOrProtoName) : [];

            const instanceNames = (typeof value === `function` && Object.getOwnPropertyNames(value.prototype || {}) || []).filter(isStaticOrProtoName);

            return [...reserved, { exportName: name, staticNames, instanceNames }];
        }, []);
}
