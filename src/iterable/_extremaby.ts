import { IterableX } from '../iterable';

/**
 * @ignore
 */
export function defaultCompare<T>(key: T, minValue: T): number {
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}

/**
 * @ignore
 */
class ExtremaByIterable<TSource, TKey> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _keyFn: (x: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => number;

  constructor(
      source: Iterable<TSource>,
      keyFn: (x: TSource) => TKey,
      cmp: (x: TKey, y: TKey) => number) {
    super();
    this._source = source;
    this._keyFn = keyFn;
    this._cmp = cmp;
  }

  *[Symbol.iterator]() {
    let result: TSource[] = [], next;
    const it = this._source[Symbol.iterator]();
    if ((next = it.next()).done) {
      throw new Error('Sequence contains no elements');
    }

    let current = next.value, resKey = this._keyFn(current);
    result.push(current);
    while (!(next = it.next()).done) {
      let curr = next.value, key = this._keyFn(curr);
      const c = this._cmp(key, resKey);
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

/**
 * @ignore
 */
export function extremaBy<TSource, TKey>(
    source: Iterable<TSource>,
    keyFn: (x: TSource) => TKey,
    cmp: (x: TKey, y: TKey) => number): IterableX<TSource> {
  return new ExtremaByIterable<TSource, TKey>(source, keyFn, cmp);
}
