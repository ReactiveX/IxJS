import { AsyncIterableX } from '../asynciterablex';
import { toArray } from '../toarray';
import { sorter as defaultSorter } from '../../util/sorter';
import { UnaryFunction } from '../../interfaces';
import { throwIfAborted } from '../../aborterror';

export abstract class OrderedAsyncIterableBaseX<TSource> extends AsyncIterableX<TSource> {
  _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const array = await toArray(this._source, signal);
    const len = array.length;
    const indices = new Array<number>(len);
    for (let i = 0; i < len; i++) {
      indices[i] = i;
    }

    indices.sort(this._getSorter(array));
    for (const index of indices) {
      yield array[index];
    }
  }

  thenBy<TKey>(
    keySelector: (item: TSource) => TKey,
    comparer: (fst: TKey, snd: TKey) => number = defaultSorter
  ): OrderedAsyncIterableBaseX<TSource> {
    return new OrderedAsyncIterableX<TKey, TSource>(
      this._source,
      keySelector,
      comparer,
      false,
      this
    );
  }

  thenByDescending<TKey>(
    keySelector: (item: TSource) => TKey,
    comparer: (fst: TKey, snd: TKey) => number = defaultSorter
  ): OrderedAsyncIterableBaseX<TSource> {
    return new OrderedAsyncIterableX<TKey, TSource>(
      this._source,
      keySelector,
      comparer,
      true,
      this
    );
  }

  abstract _getSorter(
    elements: TSource[],
    next?: (x: number, y: number) => number
  ): (x: number, y: number) => number;
}

export class OrderedAsyncIterableX<TKey, TSource> extends OrderedAsyncIterableBaseX<TSource> {
  private _keySelector: (item: TSource) => TKey;
  private _comparer: (fst: TKey, snd: TKey) => number;
  private _descending: boolean;
  private _parent?: OrderedAsyncIterableBaseX<TSource>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (item: TSource) => TKey,
    comparer: (fst: TKey, snd: TKey) => number,
    descending: boolean,
    parent?: OrderedAsyncIterableBaseX<TSource>
  ) {
    super(source);
    this._keySelector = keySelector;
    this._comparer = comparer;
    this._descending = descending;
    this._parent = parent;
  }

  _getSorter(
    elements: TSource[],
    next?: (x: number, y: number) => number
  ): (x: number, y: number) => number {
    const keys = elements.map(this._keySelector);
    const comparer = this._comparer;
    const parent = this._parent;
    const descending = this._descending;
    const sorter = (x: number, y: number): number => {
      const result = comparer(keys[x], keys[y]);
      if (result === 0) {
        return next ? next(x, y) : x - y;
      }

      return descending ? -result : result;
    };

    return parent ? parent._getSorter(elements, sorter) : sorter;
  }
}

/**
/**
 * Sorts the elements of a sequence in ascending order according to a key by using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>>} An ordered async-iterable sequence whose
 * elements are sorted according to a key and comparer.
 */
export function orderBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>> {
  return function orderByOperatorFunction(source: AsyncIterable<TSource>) {
    return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, false);
  };
}

/**
 * Sorts the elements of a sequence in descending order according to a key by using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>>} An ordered async-iterable sequence whose
 * elements are sorted in descending order according to a key and comparer.
 */
export function orderByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>> {
  return function orderByDescendingOperatorFunction(source: AsyncIterable<TSource>) {
    return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, true);
  };
}

/**
 * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>>} An ordered async-iterable whose elements are
 * sorted according to a key and comparer.
 */
export function thenBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>> {
  return function thenByOperatorFunction(source: AsyncIterable<TSource>) {
    const orderSource = <OrderedAsyncIterableBaseX<TSource>>source;
    return new OrderedAsyncIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      false,
      orderSource
    );
  };
}

/**
 * Performs a subsequent ordering of the elements in a sequence in descending order according to a key using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>>} An ordered async-iterable whose elements are
 * sorted in descending order according to a key and comparer.
 */
export function thenByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<AsyncIterable<TSource>, OrderedAsyncIterableX<TKey, TSource>> {
  return function thenByDescendingOperatorFunction(source: AsyncIterable<TSource>) {
    const orderSource = <OrderedAsyncIterableBaseX<TSource>>source;
    return new OrderedAsyncIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      true,
      orderSource
    );
  };
}
