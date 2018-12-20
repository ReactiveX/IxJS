/* tslint:disable */

// these are duplicated in the gulpfile :<
const targets = [`es5`, `es2015`, `esnext`];
const formats = [`cjs`, `esm`, `cls`, `umd`];

// Dynamically load an Ix target build based on environment vars
const path = require('path');
const target = process.env.TEST_TARGET!;
const format = process.env.TEST_MODULE!;
const useSrc =
  process.env.TEST_TS_SOURCE === `true` || (!~targets.indexOf(target) || !~formats.indexOf(format));

let modulePath = ``;

if (useSrc) modulePath = '../src';
else if (target === `ts` || target === `apache-arrow`) modulePath = target;
else modulePath = path.join(target, format);

modulePath = path.resolve(`./targets`, modulePath);
const IxInternalPath = path.join(modulePath, `Ix.internal`);
const IxInternal: typeof import('../src/Ix.internal') = require(IxInternalPath);

export = IxInternal;
