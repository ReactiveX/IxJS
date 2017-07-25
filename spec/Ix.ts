/* tslint:disable */

// Dynamically load an Ix target build based on command line arguments

const args = process.argv.slice(2);
const resolve = require('path').resolve;
const target = args[args.indexOf('--target') + 1];
const format = args[args.indexOf('--module') + 1];

// these are duplicated in the gulpfile :<
const targets = [`es5`, `es2015`, `esnext`];
const formats = [`cjs`, `esm`, `cls`, `umd`];

function throwInvalidImportError(name: string, value: string, values: string[]) {
    throw new Error('Unrecognized ' + name + ' \'' + value + '\'. Please run tests with \'--' + name + ' <any of ' + values.join(', ') + '>\'');
}

if (!~targets.indexOf(target)) throwInvalidImportError('target', target, targets);
if (!~formats.indexOf(format)) throwInvalidImportError('module', format, formats);

let Ix: any = require(resolve(`./targets/${target}/${format}/Ix.js`));
let IxInternal: any = require(resolve(`./targets/${target}/${format}/Ix.internal.js`));

import { Iterable as Iterable_ } from '../src/Ix';
import { AsyncSink as AsyncSink_ } from '../src/Ix';
import { AsyncIterable as AsyncIterable_ } from '../src/Ix';
import { iterable as iterable_ } from '../src/Ix.internal';
import { asynciterable as asynciterable_ } from '../src/Ix.internal';

export let Iterable: typeof Iterable_ = Ix.Iterable;
export let AsyncSink: typeof AsyncSink_ = Ix.AsyncSink;
export let AsyncIterable: typeof AsyncIterable_ = Ix.AsyncIterable;
export let iterable: typeof iterable_ = IxInternal.iterable;
export let asynciterable: typeof asynciterable_ = IxInternal.asynciterable;
