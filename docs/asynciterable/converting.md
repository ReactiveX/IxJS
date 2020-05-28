# Converting existing data structures to AsyncIterables

Using IxJS, you can create AsyncIterables a number of ways, converting existing structures such as `Map`, `Set`, `Array`, `Generator`, `AsyncGenerator` or even `Observable`.

Convered in this section are the following:
- Creating a sequence from an existing sequence such as `Set`, `Map` and `Generator`
- Creating a sequence from an `Observable`
- Creating a sequence from a DOM Stream
- Creating a sequence from a Node Stream

## Creating a sequence from an existing sequence such as `Set`, `Map`, `Generator` and `AsyncGenerator`.

Very often we have an existing data structure that we wish to convert to an async-iterable.  To support this, we have the `from` and `as` methods.  These methods allows us to convert any structure that implements the `[Symbol.iterator]` method such as `Map`, `Set`, `Array`, and `Generator`, as well as anything that implements the `[Symbol.asyncIterator]` method such as an `AsyncGenerator`.

The `as` method converts directly to an async-iterable, whereas with `from` method allows us to modify the collection as it is created, mimicking the the [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) method.

```typescript
import { as, from } from 'ix/asynciterable';

// As with Array and Set
const result1 = as([1, 2, 3]); // From array
const result2 = as(new Set([1, 2, 3])); // From Set

// As with generator
const source3 = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const result3 = as(source3());

// As with async-generator
const source4 = async function* () {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
};
const result4 = as(source4());

// From with Array, modifying each value
const result5 = from([1, 2, 3], x => x * x);

// From Array-like projecting the index
const result6 = from({ length: 3}, (x, i) => i);
```
