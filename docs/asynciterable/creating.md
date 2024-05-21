# Creating AsyncIterables using IxJS

Using IxJS, you can create AsyncIterables a number of ways by using some of the factory methods provided with IxJS.

Convered in this section are the following:
- Understanding Async-Iterables
- Brief Interlude - `AsyncSink`
- Creating a sequence with `create`
- Creating a sequence from values with `of`
- Creating empty or never yielding sequences with `empty` and `never`
- Creating a sequence from a range with `range`
- Creating a sequence from a loop with `generate` and `generateTime`
- Creating a sequence at a specified interval with `interval`
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
import { AsyncSink } from 'ix/Ix.asynciterable';

const sink = new AsyncSink();
sink.write(1);
sink.write(2);
sink.write(3);
sink.end();

const it = sink[Symbol.asyncIterator]();
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
import { create } from 'ix/Ix.asynciterable';

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
import { of } from 'ix/Ix.asynciterable';

const source = of(1, 2, 3, 4, 5);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

## Creating empty or never yielding sequences with `empty` and `never`

There may be cases when you want to return an empty sequence, when iterated will always say it is complete.  For that, we have the `empty` method.

```typescript
import { empty } from 'ix/Ix.asynciterable';

const source = empty();

const it = source[Symbol.asyncIterator]();
const { value, done } = it.next();
// { done: true }
```

There may also be cases where you never want the sequence to return.  In the case of `never`, it can be used in places like `race` where the other sequence will always win.

```typescript
import { never, of, race } from 'ix/Ix.asynciterable';

const source = race(of(1), never());

const it = source[Symbol.asyncIterator]();
let value, done;

{ value, done } = await it.next();
// { done: false, value: 1 }
{ value, done } = await it.next();
// { done: true }
```

## Creating a sequence from a range with `range`

Another way we can create async-iterable sequences is with a range.  For example, if we want 10 numbers starting at 1, we can use the `range` factory method to call `range(1, 10)`.

```typescript
import { range } from 'ix/Ix.asynciterable';

const source = range(1, 10);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

## Creating a sequence from a loop with `generate` and `generateTime`

We can also create a sequence as if it were inside a for-loop using `generate` and `generateTime`.  This operator acts exactly like a for loop where we have some initial state, a condition for termination, an increment, and a result selector.

```typescript
for (
  let i = 0, // Initial State
  i < 10,    // condition
  i++        // increment
) {
  // Result selector
}
```

The `generate` method has the same parameters as this for loop, as in our example here.

```typescript
import { generate } from 'ix/Ix.asynciterable';

const source = generate(
  0,            // Initial State
  i => i < 10,  // Condition
  i => i + 1,   // Iterate
  i => i        // Result selector
);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

In addition to the `generate` method, we have the `generateTime` which adds a time element to the sequence to delay in milliseconds between results.

```typescript
import { generate } from 'ix/Ix.asynciterable';

const source = generate(
  0,            // Initial State
  i => i < 10,  // Condition
  i => i + 1,   // Iterate
  i => i        // Result selector
  i => i * 1000 // Time selector in ms
);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

## Creating a sequence at a specified interval with `interval`

There are many factory functions that carry over from RxJS over to IxJS including `interval` where we can yield a value at a specified interval.  For example, we can loop through a sequence, yielding a value every 1 second.

```typescript
import { interval } from 'ix/Ix.asynciterable';

const source = interval(1000 /* ms */);

for await (const item of source) {
  console.log(`Next: ${item}`); // Yields an item every second.
}
```

## Operators in this category

There are a number of creation methods in this category:
- `create` - Creates an AsyncIterable from the `[Symbol.asyncIterator]` method implementation.
- `generate` - Generates a sequence based upon a for loop construct.
- `generateTime` - Generates a sequence based upon a for loop with a time projection.
- `empty` - Creates an empty sequence which returns an iterator result that is always done.
- `interval`- Creates a sequence which produces a value at the specified interval.
- `never` - Creates a sequence that never yields a value.
