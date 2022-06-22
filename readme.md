# The Interactive Extensions for JavaScript (IxJS)

[![Build Status](https://travis-ci.com/ReactiveX/IxJS.svg?branch=master)](https://travis-ci.com/ReactiveX/IxJS)
[![Build status](https://ci.appveyor.com/api/projects/status/dfuqvf29l477m54k/branch/master?svg=true)](https://ci.appveyor.com/project/mattpodwysocki/ixjs/branch/master)
[![npm version](https://badge.fury.io/js/ix.svg)](https://badge.fury.io/js/ix)
[![Join the chat at https://gitter.im/ReactiveXIxJS/](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ReactiveXIxJS/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*IxJS is a set of libraries to compose synchronous and asynchronous collections and [Array#extras](https://docs.microsoft.com/en-us/archive/blogs/ie/ecmascript-5-part-2-array-extras) style composition in JavaScript*

The Interactive Extensions for JavaScript (IxJS) brings the Array#extras combinators to iterables, generators, async iterables and async generators.  With the introduction of the `Symbol.iterator` and generators in ES2015, and subsequent introduction of `Symbol.asyncIterator` and async generators, it became obvious we need an abstraction over these data structures for composition, querying and more.  

IxJS unifies both synchronous and asynchronous pull-based collections, just as RxJS unified the world of push-based collections.  RxJS is great for event-based workflows where the data can be pushed at the rate of the producer, however, IxJS is great at I/O operations where you as the consumer can pull the data when you are ready.

## Install [IxJS from npm](https://www.npmjs.com/package/ix)

```sh
npm install ix
```

(also read about how we [package IxJS](#packaging) below)

## `Iterable`

The `Iterable` class a way to create and compose synchronous collections much like Arrays, Maps and Sets in JavaScript using the Array#extras style using the familiar methods you are used to like `map`, `filter`, `reduce` and more.  We can use the [`for ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statements to iterate our collections.

```js
// ES
import { from } from 'ix/iterable';
import { filter, map } from 'ix/iterable/operators';

// CommonJS
const from = require('ix/iterable').from;
const { filter, map } = require('ix/iterable/operators');

const source = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const results = from(source()).pipe(
  filter(x => x % 2 === 0),
  map(x => x * x)
);

for (let item of results) {
  console.log(`Next: ${item}`);
}

// Next 4
// Next 16
```

In addition, we also supply a `forEach` so it's your choice for which to use.

```js
// ES
import { from } from 'ix/iterable';
import { filter, map } from 'ix/iterable/operators';

// CommonJS
const from = require('ix/asynciterable').from;
const { filter, map } = require('ix/asynciterable/operators');

const source = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const results = from(source()).pipe(
  filter(x => x % 2 === 0),
  map(x => x * x)
);

results
  .forEach(item => {
    console.log(`Next: ${item}`);
  });
// Next 4
// Next 16
```

Instead of bringing in the entire library for `Iterable`, we can pick and choose which operators we want, for bundling concerns and add them directly to the `Iterable` prototype.

```js
// ES
import { IterableX as Iterable } from 'ix/iterable';
import 'ix/add/iterable/of';
import 'ix/add/iterable-operators/map';

// CommonJS
const Iterable = require('ix/iterable').IterableX;
require('ix/add/iterable/of');
require('ix/add/iterable-operators/map');

const results = Iterable.of(1,2,3)
  .map(x => x + '!!');
```

The `Iterable` object implements the iterator pattern in JavaScript by exposing the `[Symbol.iterator]` method which in turn exposes the `Iterator` class.  The iterator yields values by calling the `next()` method which returns the `IteratorResult` class.

```typescript
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
  next(value?: any): IteratorResult<T>;
  return?(value?: any): IteratorResult<T>;
  throw?(e?: any): IteratorResult<T>;
}

interface IteratorResult<T> {
  value: T;
  done: Boolean;
}
```

## `AsyncIterable`

The `AsyncIterable` object is based off the ECMAScript Proposal for [Asynchronous Iterators](https://github.com/tc39/proposal-async-iteration).  This would allow us to create asynchronous collections of Promises and be able to use such methods as the `map`, `filter`, `reduce` and other operators we can import.  Much like with the `Iterable` object where we can iterate through our collections, we can use `for await ... of` instead which allows us to iterate over the asynchronous collection.

```js
// ES
import { from } from 'ix/asynciterable';
import { filter, map } from 'ix/asynciterable/operators';

// CommonJS
const from = require('ix/asynciterable').from;
const { filter, map } = require('ix/asynciterable/operators');

const source = async function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const results = from(source()).pipe(
  filter(async x => x % 2 === 0),
  map(async x => x * x)
);

for await (let item of results) {
  console.log(`Next: ${item}`);
}

// Next 4
// Next 16
```

Alternatively, we can use the built-in `forEach` and `catch` should there be any errors:

```js
// ES
import { from } from 'ix/asynciterable';
import { filter, map } from 'ix/asynciterable/operators';

// CommonJS
const from = require('ix/asynciterable').from;
const { filter, map } = require('ix/asynciterable/operators');

const source = async function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const results = from(source()).pipe(
  filter(async x => x % 2 === 0),
  map(async x => x * x)
);

results
  .forEach(item => {
    console.log(`Next: ${item}`);
  })
  .catch(err => {
    console.log(`Error ${err}`);
  });

for await (let item of results) {
  console.log(`Next: ${item}`);
}

// Next 4
// Next 16
```

Instead of bringing in the entire library for `AsyncIterable`, we can pick and choose which operators we want, for bundling concerns directly to the `AsyncIterable` prototype.

```js
// ES
import { AsyncIterableX as AsyncIterable } from 'ix/asynciterable';
import 'ix/add/async-iterable/of';
import 'ix/add/asynciterable-operators/map';

// CommonJS
const AsyncIterable = require('ix/asynciterable').AsyncIterableX;
require('ix/add/asynciterable-operators/map');

const results = AsyncIterable.of(1,2,3)
  .map(x => x + '!!');
```

The `AsyncIterable` class implements the async iterator pattern in JavaScript by exposing the `[Symbol.asyncIterator]` method which in turn exposes the `AsyncIterator` class.  The iterator yields values by calling the `next()` method which returns a Promise which resolves a `IteratorResult` class.

```typescript
interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterator<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
  next(value?: any): Promise<IteratorResult<T>>;
  return?(value?: any): Promise<IteratorResult<T>>;
  throw?(e?: any): Promise<IteratorResult<T>>;
}

interface IteratorResult<T> {
  value: T;
  done: Boolean;
}
```

## Converting from Iterable to AsyncIterable

Using IxJS, you can easily go from an `Iterable` to an `AsyncIterable` using a number of methods.  First, we can use the `from` function, either as a standalone or on the `Ix.AsyncIterable` object.  The `from` method accepts a standard `Iterable`, `Generator`, and `Iterator` of Promises, or even another `AsyncIterable`.

```js
import { from } from 'ix/asynciterable/from';
import { map } from 'ix/asynciterable/operators';

const xs = [1, 2, 3, 4];
const mapped = from(xs).pipe(
  map(async (item, index) => item * index)
);

for await (let item of mapped) {
  console.log(`Next: ${item}`);
}

// Next 0
// Next 2
// Next 6
// Next 12
```

In addition, you can use the specialized async methods that are suffixed with `Async`, such as `mapAsync`, `filterAsync`, `flatMapAsync` amongst others. These functions accept async functions which allow you to return a `Promise` as the result.

```js
import { mapAsync } from 'ix/iterable/mapasync';

const xs = [1, 2, 3, 4];
const mapped = mapAsync(xs, async (item, index) => item * index);

for await (let item of mapped) {
  console.log(`Next: ${item}`);
}

// Next 0
// Next 2
// Next 6
// Next 12
```

## Contributing

We are grateful for contributions to the IxJS project.  The IxJS project evolves because of community involvement from people such as yourselves.  Please read below on how to get involved.

### [Code Of Conduct](CODE_OF_CONDUCT.md)

The IxJS project has a strict Code of Conduct that must be adhered at all times.  This code of conduct comes from the [Contributor Convenant](http://contributor-covenant.org/).  Please read [the full text](CODE_OF_CONDUCT.md) as to what is and is not permitted.

### Contributing Guide

Read the [Contributing Guide](CONTRIBUTING.md) on how to get involved with the IxJS project.  This includes our development process and how to test your code before committing.

### Packaging

`IxJS` is written in TypeScript, but the project is compiled to multiple JS versions and common module formats. The base IxJS package includes all the compilation targets for convenience, but if you're conscientious about your node_modules footprint, don't worry -- we got you. The targets are also published under the @reactivex namespace:

```sh
npm install @reactivex/ix-ts # TypeScript target
npm install @reactivex/ix-es5-cjs # ES5 CommonJS target
npm install @reactivex/ix-es5-esm # ES5 ESModules target
npm install @reactivex/ix-es5-umd # ES5 UMD target
npm install @reactivex/ix-es2015-cjs # ES2015 CommonJS target
npm install @reactivex/ix-es2015-esm # ES2015 ESModules target
npm install @reactivex/ix-es2015-umd # ES2015 UMD target
npm install @reactivex/ix-esnext-cjs # ESNext CommonJS target
npm install @reactivex/ix-esnext-esm # ESNext ESModules target
npm install @reactivex/ix-esnext-umd # ESNext UMD target
```

### Why we package like this

The JS community is a diverse group with a varied list of target environments and tool chains. Publishing multiple packages accommodates projects of all types. Friends targeting the latest JS runtimes can pull in the ESNext + ESM build. Friends needing wide browser support and small download size can use the UMD bundle, which has been run through Google's Closure Compiler with advanced optimizations.

If you think we missed a compilation target and it's a blocker for adoption, please open an issue. We're here for you ❤️.

## License

The MIT License (MIT)

Copyright (c) ReactiveX

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
