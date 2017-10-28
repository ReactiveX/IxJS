import { Observable } from '../observer';
import { NextObserver } from '../observer';
import { ErrorObserver } from '../observer';
import { CompletionObserver } from '../observer';
import { IterableX } from '../iterable';
import { GroupedIterable } from './groupby';
import { OrderedIterableX } from './orderby';
import { OrderedIterableBaseX } from './orderby';

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
import { generate } from './generate';
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
import { min } from './min';
import { minBy } from './minby';
import { ofEntries } from './ofentries';
import { ofKeys } from './ofkeys';
import { ofValues } from './ofvalues';
import { onErrorResumeNext } from './onerrorresumenext';
import { orderBy } from './orderby';
import { orderByDescending } from './orderby';
import { thenBy } from './orderby';
import { thenByDescending } from './orderby';
import { pairwise } from './pairwise';
import { partition } from './partition';
import { pipe } from './pipe';
import { pluck } from './pluck';
import { publish } from './publish';
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
import { skipWhile } from './skipwhile';
import { slice } from './slice';
import { some } from './some';
import { startWith } from './startwith';
import { sum } from './sum';
import { take } from './take';
import { takeLast } from './takelast';
import { takeWhile } from './takewhile';
import { tap } from './tap';
import { _throw } from './throw';
import { toArray } from './toarray';
import { toMap } from './tomap';
import { toSet } from './toset';
import { union } from './union';
import { _while } from './while';
import { zip } from './zip';

import { buffer as bufferPipe } from './pipe/buffer';
import { _catch as catchPipe } from './pipe/catch';
import { catchWith as catchWithPipe } from './pipe/catchwith';
import { concat as concatPipe } from './pipe/concat';
import { concatAll as concatAllPipe } from './pipe/concatall';
import { defaultIfEmpty as defaultIfEmptyPipe } from './pipe/defaultifempty';
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
import { skipWhile as skipWhilePipe } from './pipe/skipwhile';
import { slice as slicePipe } from './pipe/slice';
import { startWith as startWithPipe } from './pipe/startwith';
import { take as takePipe } from './pipe/take';
import { takeLast as takeLastPipe } from './pipe/takelast';
import { takeWhile as takeWhilePipe } from './pipe/takewhile';
import { tap as tapPipe } from './pipe/tap';
import { union as unionPipe } from './pipe/union';
import { zip as zipPipe } from './pipe/zip';

export type IterableX<T> = IterableX<T>;
export type Observable<T> = Observable<T>;
export type NextObserver<T> = NextObserver<T>;
export type ErrorObserver<T> = ErrorObserver<T>;
export type CompletionObserver<T> = CompletionObserver<T>;
export type GroupedIterable<TKey, TValue> = GroupedIterable<TKey, TValue>;
export type OrderedIterableX<TKey, TSource> = OrderedIterableX<TKey, TSource>;
export type OrderedIterableBaseX<TSource> = OrderedIterableBaseX<TSource>;

export default {
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
  generate,
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
  min,
  minBy,
  ofEntries,
  ofKeys,
  ofValues,
  onErrorResumeNext,
  orderBy,
  orderByDescending,
  thenBy,
  thenByDescending,
  pairwise,
  partition,
  pipe,
  pluck,
  publish,
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
  skipWhile,
  slice,
  some,
  startWith,
  sum,
  take,
  takeLast,
  takeWhile,
  tap,
  _throw,
  toArray,
  toMap,
  toSet,
  union,
  _while,
  zip,

  bufferPipe,
  catchPipe,
  catchWithPipe,
  concatPipe,
  concatAllPipe,
  defaultIfEmptyPipe,
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
  skipWhilePipe,
  slicePipe,
  startWithPipe,
  takePipe,
  takeLastPipe,
  takeWhilePipe,
  tapPipe,
  unionPipe,
  zipPipe
};
