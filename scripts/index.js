#!/usr/bin/env node

const { Observable } = require('rxjs');
const process_args = process.argv.slice(2);
const numCPUs = require('os').cpus().length;
const {
    hrStartTime, createTimeLogger,
    mkdirpObs, rimrafObs, execNpmScript,
    pairArgs, targetPath, reporter, reportMaterialized
} = require('./util');

const runTest = require('./test');
const { compile: selectAndRunCompiler } = require('./config');
const { log: logWithTime, error: errorWithTime } = createTimeLogger(hrStartTime);

module.exports = { test, build, clean, compile };

if (require.main === module) {
    let obs = Observable.empty();
    switch(process_args.shift()) {
        case '--test':
            obs = test(process_args);
            break;
        case '--build':
            obs = build(process_args);
            break;
        case '--clean':
            obs = clean(process_args);
            break;
        case '--compile':
            obs = compile(process_args);
            break;
        default:
            break;
    }
    obs.subscribe(reporter());
}

function test(args) {
    return pairArgs(args)
        /* can't test systemjs builds :< */
        .filter(([target, format]) => (format !== 'sys'))
        .concatMap(([target, format]) =>
            logWithTime(`testing ${target}.${format}`) ||
            runTest(target, format));
}

function build(args) {
    return clean(args).concat(compile(args));
}

function clean(args) {
    return pairArgs(args)
        .map(([target, format]) => targetPath(target, format))
        .mergeMap(rimrafObs, (x) => logWithTime(`[cleaned] ${x}`));
}

function compile(args) {
    return pairArgs(args).mergeMap(
        ([target, format]) => mkdirpObs(targetPath(target, format)),
        ([target, format]) => selectAndRunCompiler(target, format)
    )
    .mergeAll(numCPUs)
    .let(reportMaterialized);
}