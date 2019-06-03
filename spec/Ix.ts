import 'web-streams-polyfill';

/* tslint:disable */
// import this before assigning window global since it does a `typeof window` check
require('web-stream-tools');

/* tslint:disable */
(<any>global).window = (<any>global).window || global;

// Fix for Jest in node v10.x
Object.defineProperty(ArrayBuffer, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(inst: any) {
    return inst && inst.constructor && inst.constructor.name === 'ArrayBuffer';
  }
});

// Require rxjs first so we pick up its polyfilled Symbol.observable
require('rxjs/symbol/observable');

// // these are duplicated in the gulpfile :<
// const targets = [`es5`, `es2015`, `esnext`];
// const formats = [`cjs`, `esm`, `cls`, `umd`];

// // Dynamically load an Ix target build based on environment vars
// const path = require('path');
// const target = process.env.TEST_TARGET!;
// const format = process.env.TEST_MODULE!;
// const useSrc =
//   process.env.TEST_TS_SOURCE === `true` || (!~targets.indexOf(target) || !~formats.indexOf(format));

// let modulePath = ``;

// if (useSrc) modulePath = '../src';
// else if (target === `ts` || target === `apache-arrow`) modulePath = target;
// else modulePath = path.join(target, format);

// modulePath = path.resolve(`./targets`, modulePath);
// const IxPath = path.join(modulePath, `Ix${format === 'umd' ? '.dom' : '.node'}.internal`);
// const IxInternal: typeof import('../src/Ix.node.internal') = require(IxPath);

// export = IxInternal;
