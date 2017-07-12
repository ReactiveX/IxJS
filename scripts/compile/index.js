const { VError } = require('verror');
const generatePackage = require('./package');
const { Observable, ReplaySubject } = require('rxjs');
const { hrStartTime, createTimeLogger } = require('../util');

module.exports = createMemoizedCompiler;

function createMemoizedCompiler(compilers) {

    const compilations = {};

    return function compileMemoized(target, format) {
        return compilations[`${target}.${format}`] || (
               compilations[`${target}.${format}`] = compilation(target, format));
    }

    function compilation(target, format) {

        const compilerDesc = compilers[format];
        const compileTarget = !compilerDesc || !compilerDesc[1]
            ? (() => { throw new Error(`No compiler for module type '${format}'`); })
            : logAndMaterializeErrors(...compilerDesc).bind(null, target, format);

        return Observable
            .defer(compileTarget)
            .concat(generatePackage(target, format))
            .publish(new ReplaySubject(1)).refCount();
    }
}

function logAndMaterializeErrors(name, compiler) {
    return function logAndMaterialize(target, format) {
        let formatTime = (x) => [x], logWithTime;
        const label = `${target}.${format}`;
        const startMsg = `[start ${name}] target: ${target}, module: ${format}`;
        const errorMsg = `[error ${name}] target: ${target}, module: ${format}`;
        const complete = `[built ${name}] target: ${target}, module: ${format}`;
        return Observable.defer(() => {
            const logger = createTimeLogger(hrStartTime, startMsg);
            formatTime = logger.format;
            logWithTime = logger.log;
            return compiler(target, format);
        })
        .do(null, null, () => logWithTime(complete))
        .catch((e) => Observable.throw(e instanceof VError
            ? e
            : new VError(e, formatTime(errorMsg).join(' '))
        ))
        .materialize();
    }
}

