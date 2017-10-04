/* tslint:disable */

// Dynamically load an Ix target build based on environment vars

const path = require('path');
const target = process.env.IX_TARGET || ``;
const format = process.env.IX_MODULE || ``;

// these are duplicated in the gulpfile :<
const targets = [`es5`, `es2015`, `esnext`];
const formats = [`cjs`, `esm`, `cls`, `umd`];

function throwInvalidImportError(name: string, value: string, values: string[]) {
    throw new Error('Unrecognized ' + name + ' \'' + value + '\'. Please run tests with \'--' + name + ' <any of ' + values.join(', ') + '>\'');
}

let modulePath = ``;

if (target === `ts` || target === `ix`) modulePath = target;
else if (!~targets.indexOf(target)) throwInvalidImportError('target', target, targets);
else if (!~formats.indexOf(format)) throwInvalidImportError('module', format, formats);
else modulePath = path.join(target, format);

let Ix: any = require(path.resolve(`./targets`, modulePath, `Ix`));
let IxInternal: any = require(path.resolve(`./targets`, modulePath, `Ix.internal`));

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
