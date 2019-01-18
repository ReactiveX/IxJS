import { AsyncSink } from './asynciterable/asyncsink';
import { IterableX } from './iterable/iterablex';
import { observable } from './observer';
import { AsyncIterableX } from './asynciterable/asynciterablex';
import { GroupedIterable } from './iterable/groupby';
import { GroupedAsyncIterable } from './asynciterable/operators/groupby';
export { OrderedIterableX as OrderedIterable } from './iterable/orderby';
export { OrderedIterableBaseX as OrderedIterableBase } from './iterable/orderby';
export { OrderedAsyncIterableX as OrderedAsyncIterable } from './asynciterable/operators/orderby';
export { OrderedAsyncIterableBaseX as OrderedAsyncIterableBase } from './asynciterable/operators/orderby';

export { observable as symbolObservable };
export { AsyncSink, IterableX as Iterable, AsyncIterableX as AsyncIterable };

// Also export default to accommodate quirks of node's `--experimental-modules` mode
export default {
  AsyncSink,
  Iterable: IterableX,
  AsyncIterable: AsyncIterableX,
  // prettier-ignore
  'symbolObservable': observable
};

export type GroupedIterable<TKey, TValue> = GroupedIterable<TKey, TValue>;
export type GroupedAsyncIterable<TKey, TValue> = GroupedAsyncIterable<TKey, TValue>;

