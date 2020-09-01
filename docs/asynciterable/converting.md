# Converting existing data structures to AsyncIterables

Using IxJS, you can create AsyncIterables a number of ways, converting existing structures such as `Map`, `Set`, `Array`, `Generator`, `AsyncGenerator` or even `Observable`.

Convered in this section are the following:
- Creating a sequence from an existing sequence such as `Set`, `Map`, `Generator` and `AsyncGenerator`
- Creating a sequence from an `Observable`
- Creating a sequence from a DOM Stream
- Creating a sequence from a Node Stream
- Creating a sequence from Events
- Operators in this category

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

## Creating a sequence from an `Observable`

IxJS also gives seamless support for Observables, for those that implement the `[Symbol.observable]` method, converting to an async-iterable via the `as` and `from` methods.

```typescript
import { observableOf } from 'rxjs';
import { as } from 'ix/asynciterable';

const source = observableOf(1, 2, 3);
const results = as(source);

for await (const item of results) {
  console.log(`Next: ${item}`);
}
```

## Creating a sequence from a DOM Stream

Streams and AsyncIterables go hand in hand as a pull to push model.  DOM Streams are a newer concept, bringing streaming capabilities into the browser, and with IxJS, we can then convert those DOM streams into AsyncIterables using the `fromDOMStream` method.

```typescript
import { fromDOMStream } from 'ix/asynciterable';

const response = await fetch('someurl');

// Get the response body which is a readable stream
const source = fromDOMStream(response.body);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

## Creating a sequence from a Node Stream

Just as there is support for DOM streams, there is also support for Node.js readable streams as well.  In fact, modern Node.js readable streams are already AsyncIterable instances.

```typescript
import * as fs from 'fs';

const readable = fs.createReadStream('tmp.txt', {encoding: 'utf8'});

for await (const chunk in readable) {
  console.log(chunk);
}
```

We can then introduce IxJS by using the `fromNodeStream` which allows us then to have rich composition with our many operators.

```typescript
import * as fs from 'fs';
import { fromNodeStream } from 'ix/asynciterable/fromnodestream';

const readable = fs.createReadStream('tmp.txt', {encoding: 'utf8'});
const source = fromNodeStream(readable);

for await (const chunk in source) {
  console.log(chunk);
}
```

Or we can use `asAsyncIterable()` to take advantage of Node Streams' fluent `pipe` API:

```typescript
import * as fs from 'fs';
import { map } from 'ix/asynciterable/operators/map';
import { flatMap } from 'ix/asynciterable/operators/flatmap';
import { asAsyncIterable } from 'ix/asynciterable/asasynciterable';

const source = fs
    .createReadStream('tmp.txt', {encoding: 'utf8'})
    // Transform a Node stream into an AsyncIterable
    .pipe(asAsyncIterable({ objectMode: false }))
    // The result here is an AsyncIterableX
    .pipe(map((chunk, index) => `${index}: ${chunk}`));

for await (const chunk in source) {
  console.log(chunk);
}

```

## Creating a sequence from Events

Although we traditionally think of events being push only such as Subject/Observer or Observables, we can also bridge to events using AsyncIterables.  To do that, we have a couple of mechanisms, one called `fromEvent` which binds either your DOM `EventTarget` or Node.js `EventEmitter` to a given event.  Then you can iterate over it just like any other async-iterable sequence.

```typescript
import { EventEmitter } from 'events';
import { fromEvent } from 'ix/asynciterable';

function getEvents() {
  const emitter = new EventEmitter();
  let i = 0;

  setInterval(() => {
    emitter.emit('data', i++);
  }, 5000);

  return emitter;
}

const events = getEvents();

const source = fromEvent(events, 'data');

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

The other type of binding is `fromEventPattern` which allows you to have an add handler and a remove handler function that you specify, just in case it does not conform to either the DOM `EventTarget` or Node.js `EventEmitter`.

```typescript
import { EventEmitter } from 'events';
import { fromEvent } from 'ix/asynciterable';

function getEvents() {
  const emitter = new EventEmitter();
  let i = 0;

  setInterval(() => {
    emitter.emit('data', i++);
  }, 5000);

  return emitter;
}

const events = getEvents();

const source = fromEventPattern(
  h => events.addListener('data', h),
  h => events.removeListener('data', h)
);

for await (const item of source) {
  console.log(`Next: ${item}`);
}
```

## Operators in this category

There are a number of creation methods in this category:
- `as` - Convert an existing structure such as one that implements the `[Symbol.iterator]` or `[Symbol.asyncIterator]` methods to an AsyncIterable.
- `from` - Convert an existing structure such as one that implements the `[Symbol.iterator]` or `[Symbol.asyncIterator]` methods, or an array-like structure to an AsyncIterable with an optional projection.
- `fromDOMStream` - Convert a DOM stream to an AsyncIterable.
- `fromEvent` - Converts a DOM Event or Node.js EventEmitter to an AsyncIterable based upon a single event type.
- `fromEventPattern` - Converts any event emitter pattern with subscribe and unsubscribe logic into an AsyncIterable.
- `fromNodeStream` - Converts a Node.js stream into an AsyncIterable.
