import { AbortError } from './aborterror.js';
import { IterableX } from './iterable/iterablex.js';
import { observable } from './observer.js';
import { AsyncIterableX, AsyncSink } from './asynciterable/asynciterablex.js';
import { GroupedIterable as ImportedGroupedIterable } from './iterable/operators/groupby.js';
import { GroupedAsyncIterable as ImportedGroupedAsyncIterable } from './asynciterable/operators/groupby.js';
export { OrderedIterableX as OrderedIterable } from './iterable/operators/orderby.js';
export { OrderedIterableBaseX as OrderedIterableBase } from './iterable/operators/orderby.js';
export { OrderedAsyncIterableX as OrderedAsyncIterable } from './asynciterable/operators/orderby.js';
export { OrderedAsyncIterableBaseX as OrderedAsyncIterableBase } from './asynciterable/operators/orderby.js';

export { observable as symbolObservable };
export { AbortError, AsyncSink, IterableX as Iterable, AsyncIterableX as AsyncIterable };

// Also export default to accommodate quirks of node's `--experimental-modules` mode
/** @ignore */
export default {
  AbortError,
  AsyncSink,
  Iterable: IterableX,
  AsyncIterable: AsyncIterableX,
  // prettier-ignore
  'symbolObservable': observable
};

/** @ignore */
export type GroupedIterable<TKey, TValue> = ImportedGroupedIterable<TKey, TValue>;
/** @ignore */
export type GroupedAsyncIterable<TKey, TValue> = ImportedGroupedAsyncIterable<TKey, TValue>;

declare global {
  interface AsyncIterable<T> {
    [Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<T>;
  }
  interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.asyncIterator](signal?: AbortSignal): AsyncIterableIterator<T>;
  }
}
