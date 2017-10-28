import { Observable } from '../observer';
import { NextAsyncObserver } from '../observer';
import { ErrorAsyncObserver } from '../observer';
import { CompletionAsyncObserver } from '../observer';
import { AsyncIterableX } from '../asynciterable';
import { GroupedAsyncIterable } from './groupby';
import { OrderedAsyncIterableX } from './orderby';
import { OrderedAsyncIterableBaseX } from './orderby';
import { TimeInterval } from './timeinterval';
import { Timestamp } from './timestamp';

import { asyncify } from './asyncify';
import { asyncifyErrback } from './asyncifyerrback';
import { average } from './average';
import { buffer } from './buffer';
import { _case } from './case';
import { _catch } from './catch';
import { _catchStatic } from './catch';
import { catchWith } from './catchwith';
import { chain } from './chain';
import { concat } from './concat';
import { concatAll } from './concatall';
import { concatStatic } from './concat';
import { count } from './count';
import { create } from './create';
import { debounce } from './debounce';
import { defaultIfEmpty } from './defaultifempty';
import { defer } from './defer';
import { distinct } from './distinct';
import { distinctUntilChanged } from './distinctuntilchanged';
import { doWhile } from './dowhile';
import { elementAt } from './elementat';
import { empty } from './empty';
import { endWith } from './endwith';
import { every } from './every';
import { except } from './except';
import { expand } from './expand';
import { filter } from './filter';
import { _finally } from './finally';
import { find } from './find';
import { findIndex } from './findindex';
import { first } from './first';
import { flatMap } from './flatmap';
import { flatten } from './flatten';
import { _for } from './for';
import { fromEvent } from './fromevent';
import { fromEventPattern } from './fromeventpattern';
import { generate } from './generate';
import { generateTime } from './generatetime';
import { groupBy } from './groupby';
import { groupJoin } from './groupjoin';
import { _if } from './if';
import { ignoreElements } from './ignoreelements';
import { includes } from './includes';
import { innerJoin } from './innerjoin';
import { intersect } from './intersect';
import { isEmpty } from './isempty';
import { last } from './last';
import { map } from './map';
import { max } from './max';
import { maxBy } from './maxby';
import { memoize } from './memoize';
import { merge } from './merge';
import { mergeAll } from './mergeall';
import { min } from './min';
import { minBy } from './minby';
import { ofEntries } from './ofentries';
import { ofKeys } from './ofkeys';
import { ofValues } from './ofvalues';
import { onErrorResumeNext } from './onerrorresumenext';
import { onErrorResumeNextStatic } from './onerrorresumenext';
import { orderBy } from './orderby';
import { orderByDescending } from './orderby';
import { thenBy } from './orderby';
import { thenByDescending } from './orderby';
import { pairwise } from './pairwise';
import { partition } from './partition';
import { pluck } from './pluck';
import { publish } from './publish';
import { race } from './race';
import { range } from './range';
import { reduce } from './reduce';
import { reduceRight } from './reduceright';
import { repeat } from './repeat';
import { repeatStatic } from './repeat';
import { retry } from './retry';
import { reverse } from './reverse';
import { scan } from './scan';
import { scanRight } from './scanright';
import { sequenceEqual } from './sequenceequal';
import { share } from './share';
import { single } from './single';
import { skip } from './skip';
import { skipLast } from './skiplast';
import { skipUntil } from './skipuntil';
import { skipWhile } from './skipwhile';
import { slice } from './slice';
import { some } from './some';
import { startWith } from './startwith';
import { sum } from './sum';
import { take } from './take';
import { takeLast } from './takelast';
import { takeUntil } from './takeuntil';
import { takeWhile } from './takewhile';
import { tap } from './tap';
import { throttle } from './throttle';
import { timeInterval } from './timeinterval';
import { timeout } from './timeout';
import { timestamp } from './timestamp';
import { _throw } from './throw';
import { toArray } from './toarray';
import { toMap } from './tomap';
import { toObservable } from './toobservable';
import { toSet } from './toset';
import { union } from './union';
import { _while } from './while';
import { zip } from './zip';

import { buffer as bufferPipe } from './pipe/buffer';
import { _catch as catchPipe } from './pipe/catch';
import { catchWith as catchWithPipe } from './pipe/catchwith';
import { concat as concatPipe } from './pipe/concat';
import { concatAll as concatAllPipe } from './pipe/concatall';
import { debounce as debouncePipe } from './pipe/debounce';
import { defaultIfEmpty as defaultIfEmptyPipe } from './pipe/defaultifempty';
import { delay as delayPipe } from './pipe/delay';
import { delayEach as delayEachPipe } from './pipe/delayeach';
import { distinct as distinctPipe } from './pipe/distinct';
import { distinctUntilChanged as distinctUntilChangedPipe } from './pipe/distinctuntilchanged';
import { doWhile as doWhilePipe } from './pipe/dowhile';
import { endWith as endWithPipe } from './pipe/endwith';
import { except as exceptPipe } from './pipe/except';
import { expand as expandPipe } from './pipe/expand';
import { filter as filterPipe } from './pipe/filter';
import { _finally as finallyPipe } from './pipe/finally';
import { flatMap as flatMapPipe } from './pipe/flatmap';
import { flatten as flattenPipe } from './pipe/flatten';
import { groupBy as groupByPipe } from './pipe/groupby';
import { groupJoin as groupJoinPipe } from './pipe/groupjoin';
import { ignoreElements as ignoreElementsPipe } from './pipe/ignoreelements';
import { innerJoin as innerJoinPipe } from './pipe/innerjoin';
import { intersect as intersectPipe } from './pipe/intersect';
import { map as mapPipe } from './pipe/map';
import { maxBy as maxByPipe } from './pipe/maxby';
import { memoize as memoizePipe } from './pipe/memoize';
import { merge as mergePipe } from './pipe/merge';
import { mergeAll as mergeAllPipe } from './pipe/mergeall';
import { minBy as minByPipe } from './pipe/minby';
import { onErrorResumeNext as onErrorResumeNextPipe } from './pipe/onerrorresumenext';
import { pairwise as pairwisePipe } from './pipe/pairwise';
import { pluck as pluckPipe } from './pipe/pluck';
import { publish as publishPipe } from './pipe/publish';
import { repeat as repeatPipe } from './pipe/repeat';
import { retry as retryPipe } from './pipe/retry';
import { reverse as reversePipe } from './pipe/reverse';
import { scan as scanPipe } from './pipe/scan';
import { scanRight as scanRightPipe } from './pipe/scanright';
import { share as sharePipe } from './pipe/share';
import { skip as skipPipe } from './pipe/skip';
import { skipLast as skipLastPipe } from './pipe/skiplast';
import { skipUntil as skipUntilPipe } from './pipe/skipuntil';
import { skipWhile as skipWhilePipe } from './pipe/skipwhile';
import { slice as slicePipe } from './pipe/slice';
import { startWith as startWithPipe } from './pipe/startwith';
import { take as takePipe } from './pipe/take';
import { takeLast as takeLastPipe } from './pipe/takelast';
import { takeUntil as takeUntilPipe } from './pipe/takeuntil';
import { takeWhile as takeWhilePipe } from './pipe/takewhile';
import { tap as tapPipe } from './pipe/tap';
import { throttle as throttlePipe } from './pipe/throttle';
import { timeInterval as timeIntervalPipe } from './pipe/timeinterval';
import { timeout as timeoutPipe } from './pipe/timeout';
import { timestamp as timestampPipe } from './pipe/timestamp';
import { union as unionPipe } from './pipe/union';
import { zip as zipPipe } from './pipe/zip';

export type AsyncIterableX<T> = AsyncIterableX<T>;
export type Observable<T> = Observable<T>;
export type NextAsyncObserver<T> = NextAsyncObserver<T>;
export type ErrorAsyncObserver<T> = ErrorAsyncObserver<T>;
export type CompletionAsyncObserver<T> = CompletionAsyncObserver<T>;
export type GroupedAsyncIterable<TKey, TValue> = GroupedAsyncIterable<TKey, TValue>;
export type OrderedAsyncIterableX<TKey, TSource> = OrderedAsyncIterableX<TKey, TSource>;
export type OrderedAsyncIterableBaseX<TSource> = OrderedAsyncIterableBaseX<TSource>;
export type TimeInterval<TSource> = TimeInterval<TSource>;
export type Timestamp<TSource> = Timestamp<TSource>;

export default {
  asyncify,
  asyncifyErrback,
  average,
  buffer,
  _case,
  _catch,
  _catchStatic,
  catchWith,
  chain,
  concat,
  concatAll,
  concatStatic,
  count,
  create,
  debounce,
  defaultIfEmpty,
  defer,
  distinct,
  distinctUntilChanged,
  doWhile,
  elementAt,
  empty,
  endWith,
  every,
  except,
  expand,
  filter,
  _finally,
  find,
  findIndex,
  first,
  flatMap,
  flatten,
  _for,
  fromEvent,
  fromEventPattern,
  generate,
  generateTime,
  groupBy,
  groupJoin,
  _if,
  ignoreElements,
  includes,
  innerJoin,
  intersect,
  isEmpty,
  last,
  map,
  max,
  maxBy,
  memoize,
  merge,
  mergeAll,
  min,
  minBy,
  ofEntries,
  ofKeys,
  ofValues,
  onErrorResumeNext,
  onErrorResumeNextStatic,
  orderBy,
  orderByDescending,
  thenBy,
  thenByDescending,
  pairwise,
  partition,
  pluck,
  publish,
  race,
  range,
  reduce,
  reduceRight,
  repeat,
  repeatStatic,
  retry,
  reverse,
  scan,
  scanRight,
  sequenceEqual,
  share,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  slice,
  some,
  startWith,
  sum,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  timeInterval,
  timestamp,
  timeout,
  _throw,
  toArray,
  toMap,
  toObservable,
  toSet,
  union,
  _while,
  zip,

  bufferPipe,
  catchPipe,
  catchWithPipe,
  concatPipe,
  concatAllPipe,
  debouncePipe,
  defaultIfEmptyPipe,
  delayPipe,
  delayEachPipe,
  distinctPipe,
  distinctUntilChangedPipe,
  doWhilePipe,
  endWithPipe,
  exceptPipe,
  expandPipe,
  filterPipe,
  finallyPipe,
  flatMapPipe,
  flattenPipe,
  groupByPipe,
  groupJoinPipe,
  ignoreElementsPipe,
  innerJoinPipe,
  intersectPipe,
  mapPipe,
  maxByPipe,
  memoizePipe,
  mergePipe,
  mergeAllPipe,
  minByPipe,
  onErrorResumeNextPipe,
  pairwisePipe,
  pluckPipe,
  publishPipe,
  repeatPipe,
  retryPipe,
  reversePipe,
  scanPipe,
  scanRightPipe,
  sharePipe,
  skipPipe,
  skipLastPipe,
  skipUntilPipe,
  skipWhilePipe,
  slicePipe,
  startWithPipe,
  takePipe,
  takeLastPipe,
  takeUntilPipe,
  takeWhilePipe,
  tapPipe,
  throttlePipe,
  timeIntervalPipe,
  timestampPipe,
  timeoutPipe,
  unionPipe,
  zipPipe
};
