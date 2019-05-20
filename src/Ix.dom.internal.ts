import * as iterableX from './iterable/index';
import * as iterableXPipe from './iterable/operators/index';
import * as asynciterableX from './asynciterable/index';
import * as asynciterableXPipe from './asynciterable/operators/index';

export { iterableX as iterable };
export { iterableXPipe as iterablePipe };
export { asynciterableX as asynciterable };
export { asynciterableXPipe as asynciterablePipe };

// Manually re-export because closure-compiler doesn't support `export * from X` syntax yet
export { default } from './Ix.dom';
export { OrderedIterable } from './Ix.dom';
export { OrderedIterableBase } from './Ix.dom';
export { OrderedAsyncIterable } from './Ix.dom';
export { OrderedAsyncIterableBase } from './Ix.dom';
export { AsyncSink, Iterable, AsyncIterable } from './Ix.dom';
