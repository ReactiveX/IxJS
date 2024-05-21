import { targetDir, tsconfigName, observableFromStreams, shouldRunInChildProcess, spawnGulpCommandInChildProcess } from './util.js';

import gulp from 'gulp';
import path from 'node:path';
import tsc from 'typescript';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import { memoizeTask } from './memoize-task.js';
import { ReplaySubject, forkJoin as ObservableForkJoin, defer as ObservableDefer } from 'rxjs';
import { takeLast, share, concat } from 'rxjs/operators/index.js';

export const typescriptTask = ((cache) => memoizeTask(cache, function typescript(target, format) {
    if (shouldRunInChildProcess(target, format)) {
        return spawnGulpCommandInChildProcess('compile', target, format);
    }

    const out = targetDir(target, format);
    const tsconfigPath = path.join(`tsconfig`, `tsconfig.${tsconfigName(target, format)}.json`);
    return compileTypescript(out, tsconfigPath)
        .pipe(takeLast(1))
        .pipe(share({ connector: () => new ReplaySubject(), resetOnError: false, resetOnComplete: false, resetOnRefCountZero: false }))
}))({});

export default typescriptTask;

function compileTypescript(out, tsconfigPath, tsconfigOverrides, writeSourcemaps = true) {
    const tsProject = ts.createProject(tsconfigPath, { typescript: tsc, ...tsconfigOverrides });
    const { stream: { js, dts } } = observableFromStreams(
        tsProject.src(), sourcemaps.init(),
        tsProject(ts.reporter.defaultReporter())
    );
    const writeSources = observableFromStreams(tsProject.src(), gulp.dest(path.join(out, 'src')));
    const writeDTypes = observableFromStreams(dts, sourcemaps.write('./', { includeContent: false, sourceRoot: './src' }), gulp.dest(out));
    const writeJSArgs = writeSourcemaps ? [
        js,
        sourcemaps.write('./', { includeContent: false, sourceRoot: './src' }),
        gulp.dest(out)
    ] : [
        js,
        gulp.dest(out)
    ];
    const writeJS = observableFromStreams(...writeJSArgs);
    return ObservableForkJoin([writeSources, writeDTypes, writeJS]);
}
