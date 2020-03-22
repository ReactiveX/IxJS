import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { wrapWithAbort } from './withabort';

/**
 * @ignore
 */
export async function defaultCompareAsync<T>(key: T, minValue: T): Promise<number> {
  // eslint-disable-next-line no-nested-ternary
  return key > minValue ? 1 : key < minValue ? -1 : 0;
}

/**
 * @ignore
 */
class ExtremaByAsyncIterator<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keyFn: (x: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _cmp: (x: TKey, y: TKey) => number | Promise<number>;

  constructor(
    source: AsyncIterable<TSource>,
    keyFn: (x: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
    cmp: (x: TKey, y: TKey) => number | Promise<number>
  ) {
    super();
    this._source = source;
    this._keyFn = keyFn;
    this._cmp = cmp;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let result: TSource[] = [];
    let next;
    const it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();
    if ((next = await it.next()).done) {
      throw new Error('Sequence contains no elements');
    }

    const current = next.value;
    let resKey = await this._keyFn(current, signal);
    result.push(current);

    while (!(next = await it.next()).done) {
      const curr = next.value;
      const key = await this._keyFn(curr);
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

/**
 * @ignore
 */
export function extremaBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  keyFn: (x: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  cmp: (x: TKey, y: TKey) => number | Promise<number>
): AsyncIterableX<TSource> {
  return new ExtremaByAsyncIterator<TSource, TKey>(source, keyFn, cmp);
}
