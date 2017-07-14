const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { VError } = require('verror');
const { Observable } = require('rxjs');
const child_process = require('child_process');
const { spawn: spawnRx } = require('spawn-rx');

const mkdirpObs = (path) => Observable.bindNodeCallback(mkdirp)(path);
const rimrafObs = (path) => Observable.bindNodeCallback(rimraf)(path);
const writeFileObs = (path, file) => Observable.bindNodeCallback(fs.writeFile)(path, file);
const fileExistsObs = (path) => Observable.bindNodeCallback(fs.access)(path, fs.constants.F_OK);

const npmBin = child_process.execSync(`echo $(npm bin)`).toString().slice(0, -1);
const npmRoot = child_process.execSync(`echo $(npm root)`).toString().slice(0, -1);
const { hrtime: hrStartTime, log: logWithTime, error: errorWithTime } = createTimeLogger();

module.exports = {
    npmBin, npmRoot,
    targetPath, tsConfigPath,
    hrStartTime, createTimeLogger,
    pairArgs, reporter, reportMaterialized,
    mkdirpObs, rimrafObs, fileExistsObs, writeFileObs, execNpmScript,
};

function targetPath(target, format) {
    return path.join('targets', target, format);
}

function tsConfigPath(target, format) {
    return path.resolve(
        'tsconfig',
        [target, format, 'json'].reduce(
            (xs, x) => x ? `${xs}.${x}` : xs,
            'tsconfig'
        )
    );
}

const { targets, formats } = require('./config');
function* iterateArgs(argv) {

    const args = Array.isArray(argv) && argv || [];
    const { targetsMap, formatsMap } = args.reduce(
        ({ targetsMap, formatsMap }, arg) => (
            (targets.indexOf(arg) !== -1) && (targetsMap[arg.toLowerCase()] = true)
            ||
            (formats.indexOf(arg) !== -1) && (formatsMap[arg.toLowerCase()] = true)
            || true
        ) && { targetsMap, formatsMap },
        { targetsMap: {}, formatsMap: {} }
    );

    let _targets = Object.keys(targetsMap);
    let _formats = Object.keys(formatsMap);

    if (_targets.length === 0) _targets = targets.slice(0);
    if (_formats.length === 0) _formats = formats.slice(0);

    _targets.sort((a, b) => targets.indexOf(a) - targets.indexOf(b));
    _formats.sort((a, b) => formats.indexOf(a) - formats.indexOf(b));

    for (let t, i = -1, n = _formats.length; ++i < n;) {
        for (let j = -1, k = _targets.length; ++j < k;) {
            yield [_targets[j], _formats[i]];
        }
    }
}

function reportMaterialized(source) {
    const reporters = { N: logWithTime, E: errorWithTime };
    return source.filter((x) => 
        (!x || typeof x.kind !== 'string' || x.kind === 'C') ||
        (x.kind === 'E' && reporters['E'](VError.fullStack(x.error))) ||
        (x.kind === 'N' && x.value != null && reporters['N'](x.value)));
}

function reporter() {
    return {
        complete() { logWithTime('fin'); },
        error(e) { errorWithTime(e && e.stack || e); },
        next(x) { (x && typeof x === 'string') && console.log(x); }
    };
}

function pairArgs(argv) {
    return Observable.from(iterateArgs(argv));
}

function execNpmScript(command, opts) {
    const [script, ...args] = command.split(' ');
    return Observable.from(spawnRx(`node`, [`${npmBin}/${script}`, ...args], opts || {}));
}

function createTimeLogger(...args) {
    const hrstart = Array.isArray(args[0]) ? args.shift() : process.hrtime();
    if (args.length > 0) {
        log(...args);
    }
    function log() { return console.log.apply(console, format(...arguments)); };
    function warn() { return console.warn.apply(console, format(...arguments)); };
    function error() { return console.error.apply(console, format(...arguments)); };
    function format(...args) {
        const hrend = process.hrtime(hrstart);
        const s = hrend[0], ms = hrend[1]/1000000 | 0;
        return [`${s}.${ms}s:`, ...args];
    };
    return { log, warn, error, hrtime: hrstart, format };
}
