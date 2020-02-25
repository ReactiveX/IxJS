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
    metadataFiles, packageJSONFields,
    mainExport, npmPkgName, npmOrgName,
    targetDir, packageName, observableFromStreams
} = require('./util');

const gulp = require('gulp');
const { memoizeTask } = require('./memoize-task');
const gulpJsonTransform = require('gulp-json-transform');
const {
    ReplaySubject,
    empty: ObservableEmpty,
    forkJoin: ObservableForkJoin,
} = require('rxjs');

const { publish, refCount } = require('rxjs/operators');

const packageTask = ((cache) => memoizeTask(cache, function bundle(target, format) {
    if (target === `src`) return ObservableEmpty();
    const out = targetDir(target, format);
    const jsonTransform = gulpJsonTransform(target === npmPkgName ? createMainPackageJson(target, format) :
                                            target === `ts`       ? createTypeScriptPackageJson(target, format)
                                                                  : createScopedPackageJSON(target, format),
                                            2);
    return ObservableForkJoin(
      observableFromStreams(gulp.src(metadataFiles), gulp.dest(out)), // copy metadata files
      observableFromStreams(gulp.src(`package.json`), jsonTransform, gulp.dest(out)) // write packageJSONs
    ).pipe(publish(new ReplaySubject()), refCount());
}))({});

module.exports = packageTask;
module.exports.packageTask = packageTask;

const createMainPackageJson = (target, format) => (orig) => ({
    ...createTypeScriptPackageJson(target, format)(orig),
    bin: orig.bin,
    name: npmPkgName,
    main: `${mainExport}.node`,
    browser: `${mainExport}.dom`,
    module: `${mainExport}.dom.mjs`,
    types: `${mainExport}.node.d.ts`,
    unpkg: `${mainExport}.dom.es5.min.js`,
    esm: { mode: `all`, sourceMap: true }
});
  
const createTypeScriptPackageJson = (target, format) => (orig) => ({
    ...createScopedPackageJSON(target, format)(orig),
    bin: undefined,
    module: undefined,
    main: `${mainExport}.node.ts`,
    types: `${mainExport}.node.ts`,
    browser: `${mainExport}.dom.ts`,
    dependencies: {
        '@types/node': '*',
        ...orig.dependencies
    }
});
  
const createScopedPackageJSON = (target, format) => (({ name, ...orig }) =>
    packageJSONFields.reduce(
        (xs, key) => ({ ...xs, [key]: xs[key] || orig[key] }),
        {
            // un-set version, since it's automatically applied during the release process
            version: undefined,
            // set the scoped package name (e.g. "@apache-arrow/esnext-esm")
            name: `${npmOrgName}/${npmPkgName}-${packageName(target, format)}`,
            // set "unpkg"/"jsdeliver" if building scoped UMD target
            unpkg:    format === 'umd' ? `${mainExport}.dom.js` : undefined,
            jsdelivr: format === 'umd' ? `${mainExport}.dom.js` : undefined,
            // set "browser" if building scoped UMD target, otherwise "Arrow.dom"
            browser:  format === 'umd' ? `${mainExport}.dom.js` : `${mainExport}.dom.js`,
            // set "main" to "Arrow" if building scoped UMD target, otherwise "Arrow.node"
            main:     format === 'umd' ? `${mainExport}.dom` : `${mainExport}.node`,
            // set "module" (for https://www.npmjs.com/package/@pika/pack) if building scoped ESM target
            module:   format === 'esm' ? `${mainExport}.dom.js` : undefined,
            // include "esm" settings for https://www.npmjs.com/package/esm if building scoped ESM target
            esm:      format === `esm` ? { mode: `auto`, sourceMap: true } : undefined,
            // set "types" (for TypeScript/VSCode)
            types:    format === 'umd' ? undefined : `${mainExport}.node.d.ts`,
        }
    )
);

// const createScopedPackageJSON = (target, format) => (({ name, ...orig }) =>
//     conditionallyAddStandardESMEntry(target, format)(
//         packageJSONFields.reduce(
//             (xs, key) => ({ ...xs, [key]: xs[key] || orig[key] }),
//             {
//                 name: `${npmOrgName}/${npmPkgName}-${packageName(target, format)}`,
//                 browser: format === 'umd' ? undefined : `${mainExport}.dom`,
//                 main: format === 'umd' ? `${mainExport}.dom` : `${mainExport}.node`,
//                 types: format === 'umd' ? `${mainExport}.d.ts` : `${mainExport}.node.d.ts`,
//                 version: undefined, unpkg: undefined, module: undefined, [`esm`]: undefined,
//             }
//         )
//     )
// );
  
// const conditionallyAddStandardESMEntry = (target, format) => (packageJSON) => (
//     format !== `esm` && format !== `cls`
//         ?      packageJSON
//         : { ...packageJSON, [`esm`]: { mode: `auto`, sourceMap: true } }
// );
