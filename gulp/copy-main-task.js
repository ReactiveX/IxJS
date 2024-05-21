import { targetDir, observableFromStreams } from './util.js';

import gulp from 'gulp';
import path from 'node:path';
import { mkdirp } from 'mkdirp';
import gulpRename from 'gulp-rename';
import gulpReplace from 'gulp-replace';
import { memoizeTask } from './memoize-task.js';
import { ReplaySubject, forkJoin as ObservableForkJoin } from 'rxjs';
import { share } from 'rxjs/operators/index.js';
import { pipeline } from 'stream/promises';

export const copyMainTask = ((cache) => memoizeTask(cache, function copyMain(target) {
    const out = targetDir(target);
    const dtsGlob = `${targetDir(`es2015`, `esm`)}/**/*.ts`;
    const cjsGlob = `${targetDir(`es2015`, `cjs`)}/**/*.js`;
    const esmGlob = `${targetDir(`es2015`, `esm`)}/**/*.js`;
    const es2015UmdGlob = `${targetDir(`es2015`, `umd`)}/*.js`;
    const esnextUmdGlob = `${targetDir(`esnext`, `umd`)}/*.js`;
    const cjsSourceMapsGlob = `${targetDir(`es2015`, `cjs`)}/**/*.js.map`;
    const esmSourceMapsGlob = `${targetDir(`es2015`, `esm`)}/**/*.map`;
    const es2015UmdSourceMapsGlob = `${targetDir(`es2015`, `umd`)}/*.map`;
    const esnextUmdSourceMapsGlob = `${targetDir(`esnext`, `umd`)}/*.map`;
    return ObservableForkJoin([
        observableFromStreams(gulp.src(dtsGlob), gulp.dest(out)), // copy d.ts files
        observableFromStreams(gulp.src(cjsGlob), gulp.dest(out)), // copy es2015 cjs files
        observableFromStreams(gulp.src(cjsSourceMapsGlob), gulp.dest(out)), // copy es2015 cjs sourcemaps
        observableFromStreams(gulp.src(esmSourceMapsGlob), gulpRename((p) => { p.basename = p.basename.replace('.js', '.mjs'); }), gulpReplace(`.js"`, `.mjs"`), gulp.dest(out)), // copy es2015 esm sourcemaps
        observableFromStreams(gulp.src(es2015UmdSourceMapsGlob), gulp.dest(out)), // copy es2015 umd sourcemap files, but don't rename
        observableFromStreams(gulp.src(esnextUmdSourceMapsGlob), gulp.dest(out)), // copy esnext umd sourcemap files, but don't rename
        observableFromStreams(gulp.src(esmGlob), gulpRename((p) => { p.extname = '.mjs'; }), gulpReplace(`.js'`, `.mjs'`), gulpReplace(`.js.map`, `.mjs.map`), gulp.dest(out)), // copy es2015 esm files and rename to `.mjs`
        observableFromStreams(gulp.src(es2015UmdGlob), gulpRename((p) => { p.basename += `.es2015.min`; }), gulp.dest(out)), // copy es2015 umd files and add `.es2015.min`
        observableFromStreams(gulp.src(esnextUmdGlob), gulpRename((p) => { p.basename += `.esnext.min`; }), gulp.dest(out)), // copy esnext umd files and add `.esnext.min`
    ]).pipe(share({ connector: () => new ReplaySubject(), resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }));
}))({});

export const copyTSTask = ((cache) => memoizeTask(cache, async function copyTS(target, format) {
    const out = targetDir(target, format);
    await mkdirp(path.join(out, 'bin'));
    await pipeline(gulp.src(`src/**/*`), gulp.dest(out));
}))({});
