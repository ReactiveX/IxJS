# Transforming Sequences

With the Interactive Extensions for JavaScript, we have many ways we can transform our collections.

Convered in this section are the following:

- Transforming each value with `map`
- Plucking values with `pluck`
- Flattening sequences with `flat`
- Chaining operations with `flatMap`
- Accumulating values over time with `scan` and `scanRight`

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

## Plucking values with `pluck`

A variant of `map` is where we can specify the property names to "pluck" from the object, such as if you want the `length` property from an object, you can use `pluck('length')` to get the value.  If you need to go down several layers, you can do so by supplying additional arguments, such as `pluck('name', 'last')`, which would be calling `item.name.last` on each object.

```typescript
import { of } from 'ix/asynciterable';
import { pluck } from 'ix/asynciterable/operators';

const source = of({ name: 'Bob'}, { name: 'Sam' });
const result = source.pipe(pluck('name'));

for await (const item of mapped) {
  console.log(`Next: ${item}`);
}
// Next: Bob
// Next: Sam
```

## Flattening sequences with `flat`

Just like above, you will notice that IxJS follows the standard `Array` methods such as `map`.  In the case of when we have a non-flat async-iterable structure, we want the ability to flatten it to the specified depth.  Just as the `Array` has [`Array.prototype.flat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat), we have the `flat` operator that allows you to flatten an async-iterable down to the specified depth.

```typescript
import { of } from 'ix/asynciterable';
import { flat } from 'ix/asynciterable/operators';

// A structure like [[1, 2], [3], [4]]
const source = of(of(1, 2), of(3), of(4));
const result = source.pipe(flat());

for await (const item of mapped) {
  console.log(`Next: ${item}`);
}
// Next: 1
// Next: 2
// Next: 3
// Next: 4
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

for await (const item of mapped) {
  console.log(`Next: ${item}`);
}

// Our result should look like the following:
// [1, 2, 2, 4, 3, 6, 4, 8]
```

## Accumulating values over time with `scan` and `scanRight`

Like with the operator `map`, we can transform a collection, however, what if we wanted to accumulate from the previous value to the current and then produce a new value?  This operator is called `scan` which applies a function over the current item and accumulated value to produce a new value.  This method could have a starting seed value for the accumulated value or just uses the value from the first item.  This is in comparison to the `Array.prototype.reduce` method which only returns a value at the end.

As this method is asynchronous, the callback you provide may also be an asynchronous method.  In addition, the callback signature accepts the following parameters.  The return from this function then becomes the accumulated value for the next item.

- `accumulated`: The accumulated value to be passed in
- `item`: Current item in the sequence
- `index`: The current index in the sequence
- `signal`: An optional `AbortSignal` which can be used for cancellation.  Note if you have not set up the `AbortController` with `withAbort`, this value will be `undefined`.

```typescript
import { of } from 'ix/asynciterable';
import { scan } from 'ix/asynciterable/operators';

const source = of(1, 2, 3, 4);

const result = source.pipe(
  scan({
    seed: 0,
    (acc, item, index, signal) => acc + x
  })
);

// acc: 0, value: 1
// acc: 1, value: 2
// acc: 3, value: 3
// acc: 6, value: 4
```

There is a variant of this method called `scanRight` which accumulates values from the right side working its way left.

```typescript
import { of } from 'ix/asynciterable';
import { scanRight } from 'ix/asynciterable/operators';

const source = of(1, 2, 3, 4);

const result = source.pipe(
  scanRight({
    seed: 0,
    (acc, item, index, signal) => acc + x
  })
);

// acc: 0, value: 4
// acc: 4, value: 3
// acc: 7, value: 2
// acc: 9, value: 1
```
