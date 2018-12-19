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

const del = require('del');
const gulp = require('gulp');
const path = require('path');
const { Observable } = require('rxjs');
const buildTask = require('./gulp/build-task');
const cleanTask = require('./gulp/clean-task');
const packageTask = require('./gulp/package-task');
const { targets, modules } = require('./gulp/argv');
const { testTask, createTestData, cleanTestData } = require('./gulp/test-task');
const {
    taskName, combinations,
    knownTargets,
    npmPkgName, UMDSourceTargets,
    tasksToSkipPerTargetOrFormat
} = require('./gulp/util');

for (const [target, format] of combinations([`all`], [`all`])) {
    const task = taskName(target, format);
    gulp.task(`clean:${task}`, cleanTask(target, format));
    gulp.task( `test:${task}`,  testTask(target, format));
    gulp.task(`debug:${task}`,  testTask(target, format, true));
    gulp.task(`build:${task}`, gulp.series(`clean:${task}`,
                                            buildTask(target, format),
                                            packageTask(target, format)));
}

// The UMD bundles build temporary es5/6/next targets via TS,
// then run the TS source through either closure-compiler or
// a minifier, so we special case that here.
knownTargets.forEach((target) =>
    gulp.task(`build:${target}:umd`,
        gulp.series(
            gulp.parallel(
                cleanTask(target, `umd`),
                cleanTask(UMDSourceTargets[target], `cls`)
            ),
            buildTask(UMDSourceTargets[target], `cls`),
            buildTask(target, `umd`), packageTask(target, `umd`),
            cleanTask(UMDSourceTargets[target], `cls`)
        )
    )
);

// The main "apache-arrow" module builds the es5/umd, es2015/cjs,
// es2015/esm, and es2015/umd targets, then copies and renames the
// compiled output into the apache-arrow folder
gulp.task(`build:${npmPkgName}`,
    gulp.series(
        cleanTask(npmPkgName),
        gulp.parallel(
            `build:${taskName(`es5`, `umd`)}`,
            `build:${taskName(`es2015`, `cjs`)}`,
            `build:${taskName(`es2015`, `esm`)}`,
            `build:${taskName(`es2015`, `umd`)}`
        ),
        buildTask(npmPkgName), packageTask(npmPkgName)
    )
);

function gulpConcurrent(tasks) {
    const numCPUs = require('os').cpus().length;
    return () => Observable.from(tasks.map((task) => gulp.series(task)))
        .flatMap((task) => Observable.bindNodeCallback(task)(), numCPUs);
}

gulp.task(`clean:testdata`, cleanTestData);
gulp.task(`create:testdata`, createTestData);
gulp.task(`test`, gulpConcurrent(getTasks(`test`)));
gulp.task(`debug`, gulp.series(getTasks(`debug`)));
gulp.task(`clean`, gulpConcurrent(getTasks(`clean`)));
gulp.task(`build`, gulpConcurrent(getTasks(`build`)));
gulp.task(`default`,  gulp.series(`build`, `test`));

function getTasks(name) {
    const tasks = [];
    if (targets.indexOf(`ts`) !== -1) tasks.push(`${name}:ts`);
    if (targets.indexOf(npmPkgName) !== -1) tasks.push(`${name}:${npmPkgName}`);
    for (const [target, format] of combinations(targets, modules)) {
        if (tasksToSkipPerTargetOrFormat[target] && tasksToSkipPerTargetOrFormat[target][name]) continue;
        if (tasksToSkipPerTargetOrFormat[format] && tasksToSkipPerTargetOrFormat[format][name]) continue;
        tasks.push(`${name}:${taskName(target, format)}`);
    }
    return tasks.length && tasks || [(done) => done()];
}
