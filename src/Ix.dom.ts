import * as iterableX from './iterable/index';
import * as iterableXPipe from './iterable/pipe/index';
import * as asynciterableX from './asynciterable/index';
import * as asynciterableXPipe from './asynciterable/pipe/index';

export { iterableX as iterable };
export { iterableXPipe as iterablePipe };
export { asynciterableX as asynciterable };
export { asynciterableXPipe as asynciterablePipe };

// Manually re-export because closure-compiler doesn't support `export * from X` syntax yet
export { default } from './Ix';
export { OrderedIterable } from './Ix';
export { OrderedIterableBase } from './Ix';
export { OrderedAsyncIterable } from './Ix';
export { OrderedAsyncIterableBase } from './Ix';
export { AsyncSink, Iterable, AsyncIterable } from './Ix';

import './add/asynciterable/fromdomstream';
import './add/asynciterable-operators/todomstream';
export { toDOMStream } from './asynciterable/todomstream';
export {
  fromDOMStream,
  AsyncIterableReadableStream,
  AsyncIterableReadableByteStream
} from './asynciterable/fromdomstream';
