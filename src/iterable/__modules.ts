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
import { concatAll } from './concat';
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
import { forEach } from './foreach';
import { from } from './from';
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
import { of } from './of';
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
    forEach,
    from,
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
    of,
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
    zip
};
