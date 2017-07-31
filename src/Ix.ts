import { IterableX } from './iterable';
import { AsyncSink } from './asyncsink';
import { AsyncIterableX } from './asynciterable';

export { IterableX as Iterable, AsyncSink, AsyncIterableX as AsyncIterable };

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
} catch (e) { /* not the UMD bundle */ }
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
import './add/iterable/from';
import './add/iterable/of';
import './add/iterable/range';
import './add/iterable/repeat';
import './add/iterable/throw';
import './add/iterable/while';

// iterable operators
import './add/iterable-operators/catch';
import './add/iterable-operators/catchwith';
import './add/iterable-operators/chain';
import './add/iterable-operators/concat';
import './add/iterable-operators/concatAll';
import './add/iterable-operators/count';
import './add/iterable-operators/defaultifempty';
import './add/iterable-operators/distinct';
import './add/iterable-operators/distinctuntilchanged';
import './add/iterable-operators/elementat';
import './add/iterable-operators/every';
import './add/iterable-operators/filter';
import './add/iterable-operators/finally';
import './add/iterable-operators/find';
import './add/iterable-operators/findindex';
import './add/iterable-operators/first';
import './add/iterable-operators/flatmap';
import './add/iterable-operators/flatten';
import './add/iterable-operators/foreach';
import './add/iterable-operators/includes';
import './add/iterable-operators/isempty';
import './add/iterable-operators/last';
import './add/iterable-operators/map';
import './add/iterable-operators/memoize';
import './add/iterable-operators/pluck';
import './add/iterable-operators/publish';
import './add/iterable-operators/reduce';
import './add/iterable-operators/repeat';
import './add/iterable-operators/retry';
import './add/iterable-operators/reverse';
import './add/iterable-operators/scan';
import './add/iterable-operators/sequenceequal';
import './add/iterable-operators/share';
import './add/iterable-operators/single';
import './add/iterable-operators/skip';
import './add/iterable-operators/skiplast';
import './add/iterable-operators/skipwhile';
import './add/iterable-operators/slice';
import './add/iterable-operators/some';
import './add/iterable-operators/startwith';
import './add/iterable-operators/take';
import './add/iterable-operators/takelast';
import './add/iterable-operators/takewhile';
import './add/iterable-operators/tap';
import './add/iterable-operators/toarray';
import './add/iterable-operators/tomap';
import './add/iterable-operators/toset';
import './add/iterable-operators/zip';

// async iterable statics
import './add/asynciterable/case';
import './add/asynciterable/catch';
import './add/asynciterable/concat';
import './add/asynciterable/create';
import './add/asynciterable/defer';
import './add/asynciterable/empty';
import './add/asynciterable/for';
import './add/asynciterable/from';
import './add/asynciterable/fromevent';
import './add/asynciterable/fromeventpattern';
import './add/asynciterable/of';
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
import './add/asynciterable-operators/concatAll';
import './add/asynciterable-operators/count';
import './add/asynciterable-operators/debounce';
import './add/asynciterable-operators/defaultifempty';
import './add/asynciterable-operators/distinct';
import './add/asynciterable-operators/distinctuntilchanged';
import './add/asynciterable-operators/elementat';
import './add/asynciterable-operators/every';
import './add/asynciterable-operators/filter';
import './add/asynciterable-operators/finally';
import './add/asynciterable-operators/find';
import './add/asynciterable-operators/findindex';
import './add/asynciterable-operators/first';
import './add/asynciterable-operators/flatmap';
import './add/asynciterable-operators/flatten';
import './add/asynciterable-operators/foreach';
import './add/asynciterable-operators/includes';
import './add/asynciterable-operators/isempty';
import './add/asynciterable-operators/last';
import './add/asynciterable-operators/map';
import './add/asynciterable-operators/memoize';
import './add/asynciterable-operators/pluck';
import './add/asynciterable-operators/publish';
import './add/asynciterable-operators/reduce';
import './add/asynciterable-operators/repeat';
import './add/asynciterable-operators/retry';
import './add/asynciterable-operators/reverse';
import './add/asynciterable-operators/scan';
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
import './add/asynciterable-operators/take';
import './add/asynciterable-operators/takelast';
import './add/asynciterable-operators/takeuntil';
import './add/asynciterable-operators/takewhile';
import './add/asynciterable-operators/tap';
import './add/asynciterable-operators/throttle';
import './add/asynciterable-operators/toarray';
import './add/asynciterable-operators/tomap';
import './add/asynciterable-operators/toset';
import './add/asynciterable-operators/zip';
