import { IterableX } from '../iterablex';
import { sorter as defaultSorter } from '../../util/sorter';
import { UnaryFunction } from '../../interfaces';

/** @ignore */
export abstract class OrderedIterableBaseX<TSource> extends IterableX<TSource> {
  _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    const array = Array.from<TSource>(this._source);
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
  ): OrderedIterableBaseX<TSource> {
    return new OrderedIterableX<TKey, TSource>(this._source, keySelector, comparer, false, this);
  }

  thenByDescending<TKey>(
    keySelector: (item: TSource) => TKey,
    comparer: (fst: TKey, snd: TKey) => number = defaultSorter
  ): OrderedIterableBaseX<TSource> {
    return new OrderedIterableX<TKey, TSource>(this._source, keySelector, comparer, true, this);
  }

  abstract _getSorter(
    elements: TSource[],
    next?: (x: number, y: number) => number
  ): (x: number, y: number) => number;
}

/** @ignore */
/** @ignore */
export class OrderedIterableX<TKey, TSource> extends OrderedIterableBaseX<TSource> {
  private _keySelector: (item: TSource) => TKey;
  private _comparer: (fst: TKey, snd: TKey) => number;
  private _descending: boolean;
  private _parent?: OrderedIterableBaseX<TSource>;

  constructor(
    source: Iterable<TSource>,
    keySelector: (item: TSource) => TKey,
    comparer: (fst: TKey, snd: TKey) => number,
    descending: boolean,
    parent?: OrderedIterableBaseX<TSource>
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
 * Sorts the elements of a sequence in ascending order according to a key by using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>>} An ordered iterable sequence whose
 * elements are sorted according to a key and comparer.
 */
export function orderBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>> {
  return function orderByOperatorFunction(source: Iterable<TSource>) {
    return new OrderedIterableX<TKey, TSource>(source, keySelector, comparer, false);
  };
}

/**
 * Sorts the elements of a sequence in descending order according to a key by using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>>} An ordered iterable sequence whose
 * elements are sorted in descending order according to a key and comparer.
 */
export function orderByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>> {
  return function orderByDescendingOperatorFunction(source: Iterable<TSource>) {
    return new OrderedIterableX<TKey, TSource>(source, keySelector, comparer, true);
  };
}

/**
 * Performs a subsequent ordering of the elements in a sequence in ascending order according to a key using a specified comparer.
 *
 * @template TKey The type of the elements of source.
 * @template TSource The type of the key returned by keySelector.
 * @param {(item: TSource) => TKey} keySelector A function to extract a key from an element.
 * @param {(fst: TKey, snd: TKey) => number} [comparer=defaultSorter] A comparer to compare keys.
 * @returns {UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>>} An ordered iterable whose elements are
 * sorted according to a key and comparer.
 */
export function thenBy<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>> {
  return function thenByOperatorFunction(source: Iterable<TSource>) {
    const orderSource = <OrderedIterableBaseX<TSource>>source;
    return new OrderedIterableX<TKey, TSource>(
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
 * @returns {UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>>} An ordered iterable whose elements are
 * sorted in descending order according to a key and comparer.
 */
export function thenByDescending<TKey, TSource>(
  keySelector: (item: TSource) => TKey,
  comparer: (fst: TKey, snd: TKey) => number = defaultSorter
): UnaryFunction<Iterable<TSource>, OrderedIterableX<TKey, TSource>> {
  return function thenByDescendingOperatorFunction(source: Iterable<TSource>) {
    const orderSource = <OrderedIterableBaseX<TSource>>source;
    return new OrderedIterableX<TKey, TSource>(
      orderSource._source,
      keySelector,
      comparer,
      true,
      orderSource
    );
  };
}
