import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';
import stream from 'node:stream';
import util from 'node:util';
import asyncDoneSync from 'async-done';
const pump = stream.pipeline;
import { targets, modules } from './argv.js';
import { empty as ObservableEmpty, throwError as ObservableThrow, fromEvent as ObservableFromEvent } from 'rxjs';
import { flatMap, takeUntil, defaultIfEmpty, merge, publishReplay } from 'rxjs/operators/index.js';
const asyncDone = util.promisify(asyncDoneSync);
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const mainExport = `Ix`;
const npmPkgName = `ix`;
const npmOrgName = `@reactivex`;

const releasesRootDir = `targets`;
const knownTargets = [`es5`, `es2015`, `esnext`];
const knownModules = [`cjs`, `esm`, `cls`, `umd`];
const tasksToSkipPerTargetOrFormat = {
    ts: { bundle: true },
    src: { clean: true, build: true, bundle: true },
    cls: { test: true, package: true, bundle: true }
};
const packageJSONFields = [
    `version`, `license`, `description`,
    `author`, `homepage`, `repository`,
    `bugs`, `keywords`, `dependencies`,
    `bin`
];

const metadataFiles = [`LICENSE`, `readme.md`, `CHANGELOG.md`].map((filename) => {
    const prefixes = [`./`, `../`];
    const p = prefixes.find((prefix) => {
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
    es2018: `ECMASCRIPT_2018`,
    es2019: `ECMASCRIPT_2019`,
    esnext: `ECMASCRIPT_NEXT`
};

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

const gulpBin = path.join(path.parse(require.resolve(`gulp`)).dir, `bin/gulp.js`);
function spawnGulpCommandInChildProcess(command, target, format) {
    const err = [`Error in "${command}:${taskName(target, format)}" task:`];
    return asyncDone(() => {
        const child = child_process.spawn(
            `node`,
            [gulpBin, command, '-t', target, '-m', format, `-S`],
            {
                stdio: [`ignore`, `inherit`, `pipe`],
                env: { ...process.env, NODE_NO_WARNINGS: `1` }
            });
        child.stderr.on('data', (line) => err.push(line));
        return child;
    }).catch(() => Promise.reject(err.join('\n')));
}

const logAndDie = (e) => { if (e) { console.error(e); process.exit(1); } };
function observableFromStreams(...streams) {
    if (streams.length <= 0) { return ObservableEmpty(); }
    const pumped = streams.length <= 1 ? streams[0] : pump(...streams, logAndDie);
    const fromEvent = ObservableFromEvent.bind(null, pumped);
    const streamObs = fromEvent(`data`).pipe(
        merge(fromEvent(`error`).pipe(flatMap((e) => ObservableThrow(e)))),
        takeUntil(fromEvent(`end`).pipe(merge(fromEvent(`close`)))),
        defaultIfEmpty(`empty stream`),
        publishReplay()
    );
    streamObs.stream = pumped;
    streamObs.observable = streamObs;
    streamObs.subscription = streamObs.connect();
    return streamObs;
}

function* combinations(_targets, _modules) {
    const targets = known(knownTargets, _targets || [`all`]);
    const modules = known(knownModules, _modules || [`all`]);

    if (_targets.includes(`src`)) {
        yield [`src`, ``];
        return;
    }

    if (_targets.includes(`all`) && _modules.includes(`all`)) {
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
        return values.includes(`all`) ? known
            : values.includes(`src`) ? [`src`]
                : Object.keys(
                    values.reduce((map, arg) => ((
                        (known.includes(arg)) &&
                        (map[arg.toLowerCase()] = true)
                        || true) && map
                    ), {})
                ).sort((a, b) => known.indexOf(a) - known.indexOf(b));
    }
}

export {
    mainExport, npmPkgName, npmOrgName, metadataFiles, packageJSONFields,

    knownTargets, knownModules, tasksToSkipPerTargetOrFormat, gCCLanguageNames,

    taskName, packageName, tsconfigName, targetDir, combinations, observableFromStreams,
    shouldRunInChildProcess, spawnGulpCommandInChildProcess,
};

export const targetAndModuleCombinations = [...combinations(targets, modules)];
