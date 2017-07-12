const { Observable } = require('rxjs');
const child_process = require('child_process');
const { npmBin, npmRoot } = require('./util');

module.exports = runTest;

const specs = `spec/index.ts`;
const tapePath = `${npmBin}/tape`;
const tapSpec = require('tap-spec');
const tsconfig = `./spec/tsconfig.json`;
const tsNodeRegisterPath = `${npmRoot}/ts-node/register`;
const spawnOptions = {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: Object.assign({}, process.env, {
        'TS_NODE_FAST': true,
        'TS_NODE_CACHE': false,
        'TS_NODE_PROJECT': tsconfig
    })
};

function runTest(target, format) {
    return Observable.defer(() => {
        if (format === 'cls') { format = 'umd'; }
        const stdio = [Observable.never()];
        const proc = createTapeProc(target, format);
        proc.stderr && (stdio.push(pipeToObs(proc.stderr)));
        proc.stdout && (stdio.push(pipeToObs(proc.stdout.pipe(tapSpec()))));
        return Observable.merge(...stdio)
            .takeUntil(Observable.fromEvent(proc, 'close'))
            .takeUntil(Observable.fromEvent(proc, 'error', (e) => { throw e; }));
    });
}

function createTapeProc(target, format) {
    return child_process.spawn(`node`, [
        `--harmony_async_iteration`,
        tapePath, specs,
        `-r`, tsNodeRegisterPath,
        `--`,
        `--target`, target,
        `--module`, format
    ], spawnOptions);
}

function pipeToObs(pipe) {
    return Observable
        .fromEvent(pipe, 'data', (x) => x && x.toString().trimRight())
        .takeUntil(Observable.fromEvent(pipe, 'close'));
}
