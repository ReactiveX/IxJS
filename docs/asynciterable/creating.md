# Creating AsyncIterables using IxJS

Using IxJS, you can create AsyncIterables a number of ways, either converting existing structures such as `Map`, `Set`, `Array`, `Generator`, `AsyncGenerator` or even `Observable`, or by using some of the factory methods provided with IxJS.

Convered in this section are the following:
- Understanding Async-Iterables
- Brief Interlude - `AsyncSink`
- Creating a sequence with `create`
- Creating a sequence from values with `of`
- Creating a sequence from an existing sequence such as `Set`, `Map` and `Generator`
- Creating a sequence from a range
- Operators in this category

## Understanding Async-Iterables

To understand a little bit about what creating an async-iterable is about, let's hand roll our own async-iterable taking data from an array and then yielding values.  We get a hold of the iterator by calling the `[Symbol.asyncIterator]` method which returns itself.  We then create a method called `next()` which returns a Promise containing the iterator result indicating we have a value and whether the sequence has been completed.  Below shows an example of an async-iterable created by hand, then we get the iterator by calling `[Symbol.asyncIterator]()`, and we iterate by calling `next()`, destructuring to get the value and whether the sequence has completed.

```typescript
const source = {
  data: [1, 2, 3],
  index: 0,
  [Symbol.asyncIterator]() { return this; },
  next() {
    if (this.index === this.data.length) {
      return Promise.resolve({ done: true });
    } else {
      return Promise.resolve({ done: false, value: this.data[this.index++] });
    }
  }
}

const it = source[Symbol.asyncIterator]();
let value, done;

{ value, done } = await it.next(); 
// { done: false, value: 1 }
{ value, done } = await it.next(); 
// { done: false, value: 2 }
{ value, done } = await it.next(); 
// { done: false, value: 3 }
{ value, done } = await it.next(); 
// { done: true }
```

## Brief Interlude - `AsyncSink`

Very rarely will we ever need to create these async-iterables by hand, however, if you need a collection that you can add to as well as iterate, we have the `AsyncSink` class.  This class serves as a basis for some of our operators such as binding to events and DOM and Node.js streams.

```typescript
import { AsyncSink } from 'ix/asynciterable';

const sink = new AsyncSink();
sink.write(1);
sink.write(2);
sink.write(3);
sink.end();

const it = source[Symbol.asyncIterator]();
let value, done;

{ value, done } = await it.next(); 
// { done: false, value: 1 }
{ value, done } = await it.next(); 
// { done: false, value: 2 }
{ value, done } = await it.next(); 
// { done: false, value: 3 }
{ value, done } = await it.next(); 
// { done: true }
```

## Creating a sequence with `create`

Now that we know the basics, we can take the async-iterable from above and create an AsyncIterable from the source using the `create` method.  This takes in a function which takes in an optional `AbortSignal` for cancellation, and you return the the `[Symbol.asyncIterator]` method implementation.  It's up to you whether to cancel based upon the incoming `AbortSignal`, whether to throw an `AbortError` or not.

```typescript
import { create } from 'ix/asynciterable';

const source = {
  data: [1, 2, 3],
  index: 0,
  [Symbol.asyncIterator]() { return this; },
  next() {
    if (this.index === this.data.length) {
      return Promise.resolve({ done: true });
    } else {
      return Promise.resolve({ done: false, value: this.data[this.index++] });
    }
  }
}

const results = create((signal) => {
  return source[Symbol.asyncIterator]();
});

for await (const item of results) {
  console.log(`Next: ${item}`);
}
```

## Creating a sequence from values with `of`

Understanding the basics gets us so far, but we want to be able to easily create async-iterable sequences, for example, from known values.  To do this, we have the `of` factory function which takes any number of arguments and converts those arguments into an async-iterable sequence.  This implementation mimicks that of [`Array.of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

```typescript
import { of } from 'ix/asynciterable';

const source = of(1, 2, 3, 4, 5);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

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

## Creating a sequence from a range

## Operators in this category

There are a number of creation methods in this category:
- `as` - Convert an existing structure such as one that implements the `[Symbol.iterator]` or `[Symbol.asyncIterator]` methods to an AsyncIterable.
- `create` - Creates an AsyncIterable from the `[Symbol.asyncIterator]` method implementation.
- `from` - Convert an existing structure such as one that implements the `[Symbol.iterator]` or `[Symbol.asyncIterator]` methods, or an array-like structure to an AsyncIterable with an optional projection.
- `generate`
- `generateTime`
- `empty`
- `fromDOMStream`
- `fromEvent`
- `fromEventPattern`
- `fromNodeStream`
- `interval`
- `never`
