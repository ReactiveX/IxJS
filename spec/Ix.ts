/* tslint:disable */

// Dynamically load an Ix target build based on command line arguments

const resolve = require('path').resolve;
const args = process.argv.slice(process.argv.indexOf('--'));
const target = args[args.indexOf('--target') + 1];
const format = args[args.indexOf('--module') + 1];
const { targets, formats } = require('../scripts/config');

function throwInvalidImportError(name: string, value: string, values: string[]) {
    throw new Error('Unrecognized ' + name + ' \'' + value + '\'. Please run tests with \'--' + name + ' <any of ' + values.join(', ') + '>\'');
}

if (!~targets.indexOf(target)) throwInvalidImportError('target', target, targets);
if (!~formats.indexOf(format)) throwInvalidImportError('module', format, formats);

import { Iterable as Iterable_ } from '../src/Ix';
import { AsyncSink as AsyncSink_ } from '../src/Ix';
import { AsyncIterable as AsyncIterable_ } from '../src/Ix';
import { iterable as iterable_ } from '../src/Ix.internal';
import { asynciterable as asynciterable_ } from '../src/Ix.internal';

export let iterable: typeof iterable_;
export let Iterable: typeof Iterable_;
export let AsyncSink: typeof AsyncSink_;
export let AsyncIterable: typeof AsyncIterable_;
export let asynciterable: typeof asynciterable_;

let Ix: any, IxInternal: any, IxAsync: Promise<any>;
let IxPath = resolve(`./targets/${target}/${format}/Ix.js`);
let IxInternalPath = resolve(`./targets/${target}/${format}/Ix.internal.js`);
if (format === 'sys') {
    // If anybody knows how to make tslib play nice with SystemJS, I'd be much obliged.
    // Until then, running tests on the SystemJS targets will fail with this error:
    /*
(node:19221) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: tslib_1.__extends is not a function
Evaluating ixjs/targets/es5/sys/iterable/defer.js
Evaluating ixjs/targets/es5/sys/iterable/case.js
Evaluating ixjs/targets/es5/sys/add/iterable/case.js
Evaluating ixjs/targets/es5/sys/Ix.js
Loading ixjs/targets/es5/sys/Ix.js
     */
    const SystemJS = require('systemjs');
    SystemJS.config({
        map: { tslib: './node_modules/tslib' },
        packages: {
            '.': { defaultExtension: 'js' },
            tslib: {
                format: 'cjs',
                main: 'tslib.js',
                defaultExtension: 'js'
            }
        }
    });
    Ix = SystemJS.import(IxPath);
    IxInternal = SystemJS.import(IxInternalPath);
    IxAsync = Promise.all([Ix, IxInternal]).then(([Ix_, IxInternal_]) => ({
            Iterable: Iterable = Ix_.Iterable,
            AsyncSink: AsyncSink = Ix_.AsyncSink,
            AsyncIterable: AsyncIterable = Ix_.AsyncIterable,
            iterable: iterable = IxInternal_.iterable,
            asynciterable: asynciterable = IxInternal_.asynciterable,
    }));
} else {
    Ix = require(IxPath);
    IxInternal = require(IxInternalPath);
    IxAsync = Promise.resolve({
        Iterable: Iterable = Ix.Iterable,
        AsyncSink: AsyncSink = Ix.AsyncSink,
        AsyncIterable: AsyncIterable = Ix.AsyncIterable,
        iterable: iterable = IxInternal.iterable,
        asynciterable: asynciterable = IxInternal.asynciterable,
    });
}

export { IxAsync };
