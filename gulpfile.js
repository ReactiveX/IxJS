import { deleteAsync as del } from 'del';
import os from 'os';
import gulp from 'gulp';
import { targets } from './gulp/argv.js';
import { from as ObservableFrom, bindNodeCallback as ObservableBindNodeCallback } from 'rxjs';
import { mergeMap } from 'rxjs/operators/index.js';
import cleanTask from './gulp/clean-task.js';
import compileTask from './gulp/compile-task.js';
import packageTask from './gulp/package-task.js';
import { testTask } from './gulp/test-task.js';
import * as Path from 'node:path';
import { bundleTask, execBundleTask } from './gulp/bundle-task.js';
import { taskName, combinations, targetDir, knownTargets, npmPkgName, tasksToSkipPerTargetOrFormat, targetAndModuleCombinations, shouldRunInChildProcess, spawnGulpCommandInChildProcess } from './gulp/util.js';

for (const [target, format] of combinations([`all`], [`all`])) {
    const task = taskName(target, format);
    gulp.task(`clean:${task}`, cleanTask(target, format));
    gulp.task(`test:${task}`, testTask(target, format));
    gulp.task(`compile:${task}`, compileTask(target, format));
    gulp.task(`package:${task}`, packageTask(target, format));
    gulp.task(`build:${task}`, gulp.series(
        `clean:${task}`, `compile:${task}`, `package:${task}`
    ));
    gulp.task(`package:${task}`, packageTask(target, format));

    for (const bundler of ['esbuild', 'rollup', 'webpack']) {
        gulp.task(`bundle:${task}:${bundler}:clean`, () => del(Path.join(`integration`, bundler, target, format, '**', `*.js`)));
        gulp.task(`bundle:${task}:${bundler}:test`, bundleTask(bundler, target, format));
        gulp.task(`bundle:${task}:${bundler}:exec`, execBundleTask(bundler, target, format));
        gulp.task(`bundle:${task}:${bundler}`, gulp.series(
            `bundle:${task}:${bundler}:clean`,
            `bundle:${task}:${bundler}:test`,
            `bundle:${task}:${bundler}:exec`,
        ));
    }
    gulp.task(`bundle:${task}:webpack:analyze`, bundleTask('webpack', target, format, { analyze: true }));
    gulp.task(`bundle:${task}:clean`, gulp.parallel(
        `bundle:${task}:esbuild:clean`,
        `bundle:${task}:rollup:clean`,
        `bundle:${task}:webpack:clean`,
    ));
    gulp.task(`bundle:${task}:exec`, gulp.series(
        `bundle:${task}:esbuild:exec`,
        `bundle:${task}:rollup:exec`,
        `bundle:${task}:webpack:exec`,
    ));
    gulp.task(`bundle:${task}`, (...args) => {
        if (shouldRunInChildProcess(target, format)) {
            return spawnGulpCommandInChildProcess(`bundle`, target, format);
        }
        return gulp.parallel(
            `bundle:${task}:esbuild`,
            `bundle:${task}:rollup`,
            `bundle:${task}:webpack`,
        )(...args);
    });
}

// The UMD bundles build temporary es5/6/next targets via TS,
// then run the TS source through either closure-compiler or
// a minifier, so we special case that here.
knownTargets.forEach((target) => {
    const umd = taskName(target, `umd`);
    const cls = taskName(target, `cls`);
    gulp.task(`build:${umd}`, gulp.series(
        `build:${cls}`,
        `clean:${umd}`, `compile:${umd}`, `package:${umd}`,
        function remove_closure_tmp_files() {
            return del(targetDir(target, `cls`))
        }
    ));
});

gulp.task(`build:ts`, gulp.series(
    `build:es5:umd`, `clean:ts`, `compile:ts`, `package:ts`
));

// The main "ix" module builds the es2015/umd, es2015/cjs,
// es2015/esm, and esnext/umd targets, then copies and renames the
// compiled output into the ix folder
gulp.task(`build:${npmPkgName}`,
    gulp.series(
        gulp.parallel(
            `build:${taskName(`es2015`, `umd`)}`,
            `build:${taskName(`es2015`, `cjs`)}`,
            `build:${taskName(`es2015`, `esm`)}`,
            `build:${taskName(`esnext`, `umd`)}`
        ),
        `clean:${npmPkgName}`,
        `compile:${npmPkgName}`,
        `package:${npmPkgName}`
    )
);

// And finally the global composite tasks
gulp.task(`test`, gulpConcurrent(getTasks(`test`)));
gulp.task(`clean`, gulp.parallel(getTasks(`clean`)));
gulp.task(`build`, gulpConcurrent(getTasks(`build`)));
gulp.task(`compile`, gulpConcurrent(getTasks(`compile`)));
gulp.task(`package`, gulpConcurrent(getTasks(`package`)));
gulp.task(`bundle`, gulpConcurrent(getTasks(`bundle`)));
gulp.task(`default`, gulp.series(`clean`, `build`, `test`));

function gulpConcurrent(tasks, numCPUs = Math.max(1, os.cpus().length * 0.5) | 0) {
    return () => ObservableFrom(tasks.map((task) => gulp.series(task)))
        .pipe(mergeMap((task) => ObservableBindNodeCallback(task)(), numCPUs || 1));
}

function getTasks(name) {
    const tasks = [];
    if (targets.includes(`ts`)) tasks.push(`${name}:ts`);
    if (targets.includes(npmPkgName)) tasks.push(`${name}:${npmPkgName}`);
    for (const [target, format] of targetAndModuleCombinations) {
        if (tasksToSkipPerTargetOrFormat[target] && tasksToSkipPerTargetOrFormat[target][name]) continue;
        if (tasksToSkipPerTargetOrFormat[format] && tasksToSkipPerTargetOrFormat[format][name]) continue;
        tasks.push(`${name}:${taskName(target, format)}`);
    }
    return tasks.length && tasks || [(done) => done()];
}
