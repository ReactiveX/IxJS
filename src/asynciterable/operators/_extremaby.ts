import { AsyncIterableX } from '../asynciterablex';
import { throwIfAborted } from '../../util/aborterror';

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
  private _keyFn: (x: TSource) => TKey | Promise<TKey>;
  private _cmp: (x: TKey, y: TKey) => number | Promise<number>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    keyFn: (x: TSource) => TKey | Promise<TKey>,
    cmp: (x: TKey, y: TKey) => number | Promise<number>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._keyFn = keyFn;
    this._cmp = cmp;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let result: TSource[] = [];
    let done;
    let next;
    const it = this._source[Symbol.asyncIterator]();
    done = (next = await it.next()).done;
    throwIfAborted(this._signal);
    if (done) {
      throw new Error('Sequence contains no elements');
    }

    const current = next.value;
    let resKey = await this._keyFn(current);
    throwIfAborted(this._signal);
    done = (next = await it.next()).done;
    throwIfAborted(this._signal);
    while (!done) {
      const curr = next.value;
      const key = await this._keyFn(curr);
      throwIfAborted(this._signal);
      const c = await this._cmp(key, resKey);
      throwIfAborted(this._signal);
      if (c === 0) {
        result.push(curr);
      } else if (c > 0) {
        result = [curr];
        resKey = key;
      }
      done = (next = await it.next()).done;
      throwIfAborted(this._signal);
    }

    yield* result;
  }
}

/**
 * @ignore
 */
export function extremaBy<TSource, TKey>(
  source: AsyncIterable<TSource>,
  keyFn: (x: TSource) => TKey | Promise<TKey>,
  cmp: (x: TKey, y: TKey) => number | Promise<number>
): AsyncIterableX<TSource> {
  return new ExtremaByAsyncIterator<TSource, TKey>(source, keyFn, cmp);
}
