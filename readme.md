# The Interactive Extensions for JavaScript (IxJS)... #

*...is a set of libraries to compose synchronous and asynchronous collections and [Array#extras](http://blogs.msdn.com/b/ie/archive/2010/12/13/ecmascript-5-part-2-array-extras.aspx) style composition in JavaScript*

The Interactive Extensions for JavaScript (IxJS) is a library for creating and composing asynchronous sequences using both the `Iterable` and `AsyncIterable` classes.

## `Iterable`

The `Iterable` class a way to create and compose synchronous collections much like Arrays, Maps and Sets in JavaScript using the Array#extras style using the familiar methods you are used to like `map`, `filter`, `reduce` and more.  

```js
const Iterator = require('ix').Iterator;

Iterator.from([1,2,3,4])
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .forEach(x => console.log(`Next ${x}`));

// => 4
// => 8
```

The `Iterable` class implements the iterator pattern in JavaScript by exposing the `[Symbol.iterator]` method which in turn exposes the `Iterator` class.  The iterator yields values by calling the `next()` method which returns the `IteratorResult` class.

```typescript
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
  [Symbol.iterator](): Iterator<T>;
  next(): IteratorResult<T>;
}

interface IteratorResult<T> {
  value: T;
  done: Boolean;
}
```

## `AsyncIterable`

The `AsyncIterator` class is based off the ECMAScript Proposal for [Asynchronous Iterators](https://github.com/tc39/proposal-async-iteration).  This would allow us to create asynchronous collections of Promises and be able to use such methods as the `map`, `filter`, `reduce` and other Array#extras methods that you are used to using.

```js
const AsyncIterable = require('ix').AsyncIterable;

async function *gen() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
  yield Promise.resolve(4);
}

AsyncIterable.from(gen())
  .filter(x => x % 2 === 0)
  .map(x => x * 2)
  .forEachAsync(x => console.log(`Next ${x}`))
  .catch(err => console.log(`Error ${err}`));

// => 4
// => 8
```

The `AsyncIterable` class implements the async iterator pattern in JavaScript by exposing the `[Symbol.asyncIterator]` method which in turn exposes the `AsyncIterator` class.  The iterator yields values by calling the `next()` method which returns a Promise which resolves a `IteratorResult` class.

```typescript
interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface Iterator<T> {
  [Symbol.asyncIterator](): Iterator<T>;
  next(value): Promise<IteratorResult<T>>;
  [optional] throw(value): Promise<IteratorResult<T>>;
  [optional] return(value): Promise<IteratorResult<T>>;
}

interface IteratorResult<T> {
  value: T;
  done: Boolean;
}
```

## License ##

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
