import { AsyncIterableX } from '../asynciterable';
import { toArray } from './toarray';
import { sorter as defaultSorter } from '../internal/sorter';

export abstract class OrderedAsyncIterableBaseX<TSource> extends AsyncIterableX<TSource> {
  _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    const array = await toArray(this._source);
    const len = array.length;
    const indices = new Array<number>(len);
    for (let i = 0, len = array.length; i < len; i++) {
      indices[i] = i;
    }

    indices.sort(this._getSorter(array));
    for (const index of indices) {
      yield array[index];
    }
  }

  thenBy<TKey>(
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableBaseX<TSource> {
    /* tslint:disable-next-line: no-use-before-declare */
    return new OrderedAsyncIterableX<TKey, TSource>(this._source, keySelector, comparer, false, this);
  }

  thenByDescending<TKey>(
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableBaseX<TSource> {
    /* tslint:disable-next-line: no-use-before-declare */
    return new OrderedAsyncIterableX<TKey, TSource>(this._source, keySelector, comparer, true, this);
  }

  abstract _getSorter(
    elements: TSource[],
    next?: (x: number, y: number) => number): (x: number, y: number) => number;
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
      parent?: OrderedAsyncIterableBaseX<TSource>) {
    super(source);
    this._keySelector = keySelector;
    this._comparer = comparer;
    this._descending = descending;
    this._parent = parent;
  }

  _getSorter(
      elements: TSource[],
      next?: (x: number, y: number) => number): (x: number, y: number) => number {
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

export function orderBy<TKey, TSource>(
      source: AsyncIterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableX<TKey, TSource> {
  return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, false);
}

export function orderByDescending<TKey, TSource>(
      source: AsyncIterable<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableX<TKey, TSource> {
  return new OrderedAsyncIterableX<TKey, TSource>(source, keySelector, comparer, true);
}

export function thenBy<TKey, TSource>(
      source: OrderedAsyncIterableBaseX<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableX<TKey, TSource> {
  return new OrderedAsyncIterableX<TKey, TSource>(source._source, keySelector, comparer, false, source);
}

export function thenByDescending<TKey, TSource>(
      source: OrderedAsyncIterableBaseX<TSource>,
      keySelector: (item: TSource) => TKey,
      comparer: (fst: TKey, snd: TKey) => number = defaultSorter): OrderedAsyncIterableX<TKey, TSource> {
  return new OrderedAsyncIterableX<TKey, TSource>(source._source, keySelector, comparer, true, source);
}
