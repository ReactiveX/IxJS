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

const gulp = require('gulp');
const { Observable } = require('rxjs');
const cleanTask = require('./gulp/clean-task');
const { testTask } = require('./gulp/test-task');
const compileTask = require('./gulp/compile-task');
const packageTask = require('./gulp/package-task');
const { targets, modules } = require('./gulp/argv');
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
    gulp.task(`compile:${task}`, compileTask(target, format));
    gulp.task(`package:${task}`, packageTask(target, format));
    gulp.task(`build:${task}`, gulp.series(`clean:${task}`, `compile:${task}`, `package:${task}`));
}

// The UMD bundles build temporary es5/6/next targets via TS,
// then run the TS source through either closure-compiler or
// a minifier, so we special case that here.
knownTargets.forEach((target) =>
    gulp.task(`compile:${target}:umd`,
        gulp.series(
            compileTask(UMDSourceTargets[target], `cls`),
            compileTask(target, `umd`),
            cleanTask(UMDSourceTargets[target], `cls`)
        )
    )
);

// The main "apache-arrow" module builds the es5/umd, es2015/cjs,
// es2015/esm, and es2015/umd targets, then copies and renames the
// compiled output into the apache-arrow folder
gulp.task(`compile:${npmPkgName}`,
    gulp.series(
        gulp.parallel(
            `compile:${taskName(`es5`, `umd`)}`,
            `compile:${taskName(`es2015`, `cjs`)}`,
            `compile:${taskName(`es2015`, `esm`)}`,
            `compile:${taskName(`es2015`, `umd`)}`
        ),
        compileTask(npmPkgName)
    )
);

function gulpConcurrent(tasks) {
    const numCPUs = process.env.IS_APPVEYOR_CI ? 1 : require('os').cpus().length;
    return () => Observable.from(tasks.map((task) => gulp.series(task)))
        .flatMap((task) => Observable.bindNodeCallback(task)(), numCPUs);
}

gulp.task(`test`, gulpConcurrent(getTasks(`test`)));
gulp.task(`clean`, gulp.parallel(getTasks(`clean`)));
gulp.task(`build`, gulpConcurrent(getTasks(`build`)));
gulp.task(`compile`, gulpConcurrent(getTasks(`compile`)));
gulp.task(`package`, gulpConcurrent(getTasks(`package`)));
gulp.task(`default`,  gulp.series(`clean`, `compile`, `test`, `package`));

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
