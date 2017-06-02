'use strict';

import { AsyncIterableX } from '../asynciterable';

export async function defaultCompareAsync<T>(key: T, minValue: T): Promise<number> {
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}

class ExtremaByAsyncIterator<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keyFn: (x: TSource) => TKey | Promise<TKey>;
  private _cmp: (x: TKey, y: TKey) => number | Promise<number>;

  constructor(
      source: AsyncIterable<TSource>,
      keyFn: (x: TSource) => TKey | Promise<TKey>,
      cmp: (x: TKey, y: TKey) => number | Promise<number>) {
    super();
    this._source = source;
    this._keyFn = keyFn;
    this._cmp = cmp;
  }

  async *[Symbol.asyncIterator]() {
    let result: TSource[] = [], next;
    const it = this._source[Symbol.asyncIterator]();
    if ((next = await it.next()).done) {
      throw new Error('Sequence contains no elements');
    }

    let current = next.value, resKey = await this._keyFn(current);
    while (!(next = await it.next()).done) {
      let curr = next.value, key = await this._keyFn(curr);
      const c = await this._cmp(key, resKey);
      if (c === 0) {
        result.push(curr);
      } else if (c > 0) {
        result = [curr];
        resKey = key;
      }
    }

    yield* result;
  }
}

export function extremaBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keyFn: (x: TSource) => TKey | Promise<TKey>,
    cmp: (x: TKey, y: TKey) => number | Promise<number>): AsyncIterableX<TSource> {
  return new ExtremaByAsyncIterator<TSource, TKey>(source, keyFn, cmp);
}