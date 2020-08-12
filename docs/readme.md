# The Interactive Extensions for JavaScript (IxJS)

The Interactive Extensions for JavaScript (IxJS) is a set of methods on top of `Iteratable` and `AsyncIterable` serving as a standard library for both.  Much like its push-based counterpart, the Interactive Extensions for JavaScript unifies the programming model around pull-based collections, either synchronous in the case of `Iterable` or asynchronous with `AsyncIterable`.

## Iterable

Starting in ES6, the [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) method was introduced to allow for iteration over collections such as `Array`, `Map`, `Set` and even ``Generator`.  IxJS introduces a number of creation factories and operators that operate on these `Iterable` collections lazily.  Each factory can be imported from `'ix/iterable'` and operators from `'ix/iterable/operators'` such as the following creating an iterable via `of` and then transforming each item using the `map` operator.  You can then iterate over the resulting collection using [`for ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) syntax, or the use of the `forEach` method.

```typescript
import { of } from 'ix/iterable';
import { map } from 'ix/iterable/operators';

const source = of(1, 2, 3, 4, 5);
const result = source.pipe(
  map(x => x * x)
);

for (const item of result) {
  console.log(`Next: ${result}`);
}
```

Alternatively, you can program using dot-notation where we add methods to the `IterableX` object so we can program in a fluent style.  We can bring in only the factories operators we need, therefore not needing to bring in the entire library with all its operators.  The factories can be brought in via `'ix/add/iterable/<name>'` and operators via `'ix/add/iterable-operators/<name>'`, where `name` is replaced with the factory or operator of your choice.

```typescript
import { IterableX as Iterable } from 'ix/iterable';

// Add factory and operators
import 'ix/add/iterable/of';
import 'ix/add/iterable-operators/map';

const source = Iterable.of(1, 2, 3, 4, 5);
const result = source.map(x => x);

for (const item of result) {
  console.log(`Next: ${result}`);
}
```

That's only the beginning with IxJS and each section below covers more in detail:

- Creating Sequences
- Converting to and from Arrays, Maps and Sets
- Converting to DOM and Node Streams
- Transforming Sequences
- Filtering Sequences
- Combining Sequences
- Aggregate Operations
- Conditional Operators
- Error Handling
- Debugging and Side Effects

## AsyncIterable

In ES2018, the concept of asynchronous iteration was introduced, which allowed the same kind of iteration we had in ES6, but for asynchronous sequences using the [`Symbol.asyncIterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) method for things such as asynchronous generators.  IxJS here introduces a whole set of factories and operators on async iterables to serve as a standard class library, covering the same operators as `Iterable`, but also adding in asynchronous operations such as `race`, but also time based operations as well.  Each factory such as `from`, an `of` can be imported via `'ix/asynciterable'` as well as operators such as `map` and `filter` can be imported via `'ix/asynciterable/operators'`.  Once created, uou can then iterate over the resulting collection using [`for await ... of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) syntax, or the use of the `forEach` method.

```typescript
import { as } from 'ix/asynciterable';
import { map } from 'ix/asynciterable/operators';

const soureFactory = async function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const source = as(sourceFactory());
const result = source.pipe(
  map(async x => x * x)
);

for await (const item of results) {
  console.log(`Next: ${item}`);
}
```

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for the web brought in a new way to think about getting data using Promises instead of the legacy `XMLHttpRequest` API.  With this also brought in the idea of cancellation via the [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) and [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal), also known as the Abort API.  IxJS also supports this with a number of async aggregate operations such as `first`, `last` accepting an `AbortSignal` but also introducing `AbortSignal` support to pass through the entire chain.  This section gives a very brief introduction for support but is documented later on below.

```typescript
import { as, last } from 'ix/asynciterable';
import { map, withAbort } from 'ix/asynciterable/operators';

const sourceFactory = async function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const source = as(sourceFactory());

// Passing in an abort Signal to an aggregate
const controller1 = new AbortController();
const lastItem = await last(source, { signal: constroller1.signal });

// Add abort signal to a chain
const controller2 = new AbortController();
const result = source.pipe(
  withAbort(controller2.signal),
  map(async x => x * x)
);

for await (const item of result) {
  console.log(`Next: ${item}`);
}
```

If you prefer the fluent style of method chaining, IxJS also supports this for async-iterables via the `AsyncIterableX` object.  Then you can add the factories or operators of your choosing without bringing in the entire library.  The factories can be brought in via `'ix/add/asynciterable/<name>'` and operators via `'ix/add/asynciterable-operators/<name>'`, where `name` is replaced with the factory or operator of your choice.

```typescript
import { AsyncIterableX as AsyncIterable } from 'ix/asynciterable';
import 'ix/add/asynciterable/as';
import 'ix/add/asynciterable/last';
import 'ix/add/asynciterable-operators/map';
import 'ix/add/asynciterable-operators/withabort';

const sourceFactory = async function*() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
};

const controller = new AbortController();
const result = await as(sourceFactory())
  .withAbort(controller.signal)
  .map(async x => x * x)
  .last({ signal: controller.signal });
```

This just scratches the surface with the capabilities of using async iterables with each section going into detail below.

- [Creating Sequences](asynciterable/creating.md)
- [Converting to AsyncIterable, which includes](asynciterable/converting.md):
  - Events
  - DOM and Node.js Streams
  - Iterables such as `Array`, `Map`, `Set`, `Generator` and `AsyncGenerator`.
  - Observables
- Transforming Sequences
- Filtering Sequences
- Combining Sequences
- Aggregate Operations
- Conditional Operators
- Error Handling
- Debugging and Side Effects
- Time Based Operations
- Aborting a Stream
