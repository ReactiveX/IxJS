import { AsyncSink } from './asyncsink';
import { IterableX } from './iterable/iterablex';
import { AsyncIterableX } from './asynciterable/asynciterablex';
import { GroupedIterable } from './iterable/groupby';
import { GroupedAsyncIterable } from './asynciterable/groupby';
export { OrderedIterableX as OrderedIterable } from './iterable/orderby';
export { OrderedIterableBaseX as OrderedIterableBase } from './iterable/orderby';
export { OrderedAsyncIterableX as OrderedAsyncIterable } from './asynciterable/orderby';
export { OrderedAsyncIterableBaseX as OrderedAsyncIterableBase } from './asynciterable/orderby';

export { AsyncSink, IterableX as Iterable, AsyncIterableX as AsyncIterable };

// Also export default to accommodate quirks of node's `--experimental-modules` mode
export default {
  AsyncSink,
  Iterable: IterableX,
  AsyncIterable: AsyncIterableX
};

export type GroupedIterable<TKey, TValue> = GroupedIterable<TKey, TValue>;
export type GroupedAsyncIterable<TKey, TValue> = GroupedAsyncIterable<TKey, TValue>;

/* These declarations are needed for the closure/umd targets */
export declare namespace Symbol {
  export const iterator: symbol;
  export const asyncIterator: symbol;
}
try {
  const Ix = eval('exports');
  if (typeof Ix === 'object') {
    // string indexers tell closure compiler not to rename these properties
    Ix['Iterable'] = IterableX;
    Ix['AsyncSink'] = AsyncSink;
    Ix['AsyncIterable'] = AsyncIterableX;
  }
} catch (e) {
  /* not the UMD bundle */
}
/** end google declarations */

// iterable statics
/* tslint:disable:no-use-before-declare */
import './add/iterable/case';
import './add/iterable/catch';
import './add/iterable/concat';
import './add/iterable/create';
import './add/iterable/defer';
import './add/iterable/empty';
import './add/iterable/for';
import './add/iterable/range';
import './add/iterable/repeat';
import './add/iterable/throw';
import './add/iterable/while';

// // iterable operators
import './add/iterable-operators/average';
import './add/iterable-operators/buffer';
import './add/iterable-operators/catch';
import './add/iterable-operators/catchwith';
import './add/iterable-operators/chain';
import './add/iterable-operators/concat';
import './add/iterable-operators/concatall';
import './add/iterable-operators/count';
import './add/iterable-operators/defaultifempty';
import './add/iterable-operators/distinct';
import './add/iterable-operators/distinctuntilchanged';
import './add/iterable-operators/dowhile';
import './add/iterable-operators/elementat';
import './add/iterable-operators/endwith';
import './add/iterable-operators/every';
import './add/iterable-operators/except';
import './add/iterable-operators/expand';
import './add/iterable-operators/filter';
import './add/iterable-operators/finally';
import './add/iterable-operators/find';
import './add/iterable-operators/findindex';
import './add/iterable-operators/first';
import './add/iterable-operators/flatmap';
import './add/iterable-operators/flatten';
import './add/iterable-operators/groupby';
import './add/iterable-operators/groupjoin';
import './add/iterable-operators/ignoreelements';
import './add/iterable-operators/includes';
import './add/iterable-operators/innerjoin';
import './add/iterable-operators/intersect';
import './add/iterable-operators/isempty';
import './add/iterable-operators/last';
import './add/iterable-operators/map';
import './add/iterable-operators/max';
import './add/iterable-operators/maxby';
import './add/iterable-operators/memoize';
import './add/iterable-operators/min';
import './add/iterable-operators/minby';
import './add/iterable-operators/onerrorresumenext';
import './add/iterable-operators/orderby';
import './add/iterable-operators/pairwise';
import './add/iterable-operators/partition';
import './add/iterable-operators/pluck';
import './add/iterable-operators/publish';
import './add/iterable-operators/reduce';
import './add/iterable-operators/reduceright';
import './add/iterable-operators/repeat';
import './add/iterable-operators/retry';
import './add/iterable-operators/reverse';
import './add/iterable-operators/scan';
import './add/iterable-operators/scanright';
import './add/iterable-operators/sequenceequal';
import './add/iterable-operators/share';
import './add/iterable-operators/single';
import './add/iterable-operators/skip';
import './add/iterable-operators/skiplast';
import './add/iterable-operators/skipwhile';
import './add/iterable-operators/slice';
import './add/iterable-operators/some';
import './add/iterable-operators/startwith';
import './add/iterable-operators/sum';
import './add/iterable-operators/take';
import './add/iterable-operators/takelast';
import './add/iterable-operators/takewhile';
import './add/iterable-operators/tap';
import './add/iterable-operators/toarray';
import './add/iterable-operators/tomap';
import './add/iterable-operators/toset';
import './add/iterable-operators/union';
import './add/iterable-operators/zip';

// async iterable statics
import './add/asynciterable/asyncify';
import './add/asynciterable/asyncifyerrback';
import './add/asynciterable/case';
import './add/asynciterable/catch';
import './add/asynciterable/concat';
import './add/asynciterable/create';
import './add/asynciterable/defer';
import './add/asynciterable/empty';
import './add/asynciterable/for';
import './add/asynciterable/fromevent';
import './add/asynciterable/fromeventpattern';
import './add/asynciterable/race';
import './add/asynciterable/range';
import './add/asynciterable/repeat';
import './add/asynciterable/throw';

// async iterable operators
import './add/asynciterable-operators/average';
import './add/asynciterable-operators/buffer';
import './add/asynciterable-operators/catch';
import './add/asynciterable-operators/catchwith';
import './add/asynciterable-operators/chain';
import './add/asynciterable-operators/concat';
import './add/asynciterable-operators/concatall';
import './add/asynciterable-operators/count';
import './add/asynciterable-operators/debounce';
import './add/asynciterable-operators/defaultifempty';
import './add/asynciterable-operators/distinct';
import './add/asynciterable-operators/distinctuntilchanged';
import './add/asynciterable-operators/dowhile';
import './add/asynciterable-operators/elementat';
import './add/asynciterable-operators/endwith';
import './add/asynciterable-operators/every';
import './add/asynciterable-operators/except';
import './add/asynciterable-operators/expand';
import './add/asynciterable-operators/filter';
import './add/asynciterable-operators/finally';
import './add/asynciterable-operators/find';
import './add/asynciterable-operators/findindex';
import './add/asynciterable-operators/first';
import './add/asynciterable-operators/flatmap';
import './add/asynciterable-operators/flatten';
import './add/asynciterable-operators/groupby';
import './add/asynciterable-operators/groupjoin';
import './add/asynciterable-operators/ignoreelements';
import './add/asynciterable-operators/includes';
import './add/asynciterable-operators/innerjoin';
import './add/asynciterable-operators/intersect';
import './add/asynciterable-operators/isempty';
import './add/asynciterable-operators/last';
import './add/asynciterable-operators/map';
import './add/asynciterable-operators/max';
import './add/asynciterable-operators/maxby';
import './add/asynciterable-operators/memoize';
import './add/asynciterable-operators/merge';
import './add/asynciterable-operators/mergeall';
import './add/asynciterable-operators/min';
import './add/asynciterable-operators/minby';
import './add/asynciterable-operators/onerrorresumenext';
import './add/asynciterable-operators/orderby';
import './add/asynciterable-operators/pairwise';
import './add/asynciterable-operators/partition';
import './add/asynciterable-operators/pluck';
import './add/asynciterable-operators/publish';
import './add/asynciterable-operators/reduce';
import './add/asynciterable-operators/reduceright';
import './add/asynciterable-operators/repeat';
import './add/asynciterable-operators/retry';
import './add/asynciterable-operators/reverse';
import './add/asynciterable-operators/scan';
import './add/asynciterable-operators/scanright';
import './add/asynciterable-operators/sequenceequal';
import './add/asynciterable-operators/share';
import './add/asynciterable-operators/single';
import './add/asynciterable-operators/skip';
import './add/asynciterable-operators/skiplast';
import './add/asynciterable-operators/skipuntil';
import './add/asynciterable-operators/skipwhile';
import './add/asynciterable-operators/slice';
import './add/asynciterable-operators/some';
import './add/asynciterable-operators/startwith';
import './add/asynciterable-operators/sum';
import './add/asynciterable-operators/take';
import './add/asynciterable-operators/takelast';
import './add/asynciterable-operators/takeuntil';
import './add/asynciterable-operators/takewhile';
import './add/asynciterable-operators/tap';
import './add/asynciterable-operators/throttle';
import './add/asynciterable-operators/toarray';
import './add/asynciterable-operators/tomap';
import './add/asynciterable-operators/toobservable';
import './add/asynciterable-operators/toset';
import './add/asynciterable-operators/union';
import './add/asynciterable-operators/zip';
