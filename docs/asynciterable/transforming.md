# Transforming Sequences

With the Interactive Extensions for JavaScript, we have many ways we can transform our collections.

Convered in this section are the following:

- Transforming each value with `map`
- Chaining operations with `flatMap`

## Transforming each value with `map`

One of the most common operations is to transform each element of a collection, for example, you can take a list of words and make them all upper case.  By using the `map` operator, we inspect and transform the item, returning a new collection with the function provided invoked on each item in the source collection.  This is analogous to the [`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method you may be familiar with.

As this method is asynchronous, the callback you provide may also be an asynchronous method.  In addition, the callback signature accepts the following parameters.

- `item`: Current item in the sequence
- `index`: The current index in the sequence
- `signal`: An optional `AbortSignal` which can be used for cancellation.  Note if you have not set up the `AbortController` with `withAbort`, this value will be `undefined`.

```typescript
import { of } from 'ix/asynciterable';
import { map } from 'ix/asynciterable/operators';

const source = of(1, 4, 9, 16);

const mapped = source.pipe(
  map(async (item, index, signal) => item * 2)
);

for await (const item of mapped) {
  console.log(`Next: ${item}`);
}
// Next: 2
// Next: 8
// Next: 18
// Next: 32
```

If we want to add cancellation support for our map operation, we can supply one with `withAbort` and then cancel the operation should we need to.  This callback allows us then to pass along the `AbortSignal` to any other operation that might require cancellation.  Many operators with functions with pass through an `AbortSignal` as a callback parameter, such as `filter`, `flatMap`, `scan` and more.

```typescript
import { of } from 'ix/asynciterable';
import { map, withAbort } from 'ix/asynciterable/operators';

const controller = new AbortController();

const source = of(1, 4, 9, 16);

const mapped = source.pipe(
  withAbort(controller.signal)
  map(async (item, index, signal) => {
    console.log(`Signal aborted? ${signal.aborted}`);
    return item * 2;
  }
);

for await (const item of mapped) {
  console.log(`Next: ${item}`);
}
// Signal aborted? false
// Next: 2
// Signal aborted? false
// Next: 8
// Signal aborted? false
// Next: 18
// Signal aborted? false
// Next: 32
```

## Chaining operations with `flatMap`

We can combine sequences together where like `map`, we transform each item into another, but instead of returning a single item, the callback returns an `AsyncIterable`.  That result is then flattened to a single sequence, hence the name `flat` and `map` combined to make `flatMap`.  This operator can also be found on the built-in `Array` class with the `Array.prototype.flatMap` method.

Much like `map`, the `flatMap` operator accepts an asynchronous function which accepts the following parameters:

- `item`: Current item in the sequence
- `index`: The current index in the sequence
- `signal`: An optional `AbortSignal` which can be used for cancellation.  Note if you have not set up the `AbortController` with `withAbort`, this value will be `undefined`.

```typescript
import { of } from 'ix/asynciterable';
import { map } from 'ix/asynciterable/operators';

const source = of(1, 2, 3, 4);

const mapped = of.pipe(
  flatMap(async (item, index, signal) => of(item, item * 2))
);

// Our result should look like the following:
// [1, 2, 2, 4, 3, 6, 4, 8]
for await (const item of mapped) {
  console.log(`Next: ${item}`);
}
```
