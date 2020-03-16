import { AsyncIterableX } from '../asynciterablex';
import { toArray } from '../toarray';
import { OperatorAsyncFunction } from '../../interfaces';

export class ScanRightAsyncIterable<T, R> extends AsyncIterableX<R> {
  private _source: AsyncIterable<T>;
  private _fn: (acc: R, x: T, index: number, signal?: AbortSignal) => R | Promise<R>;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(
    source: AsyncIterable<T>,
    fn: (acc: R, x: T, index: number) => R | Promise<R>,
    seed: R[]
  ) {
    super();
    this._source = source;
    this._fn = fn;
    this._hasSeed = seed.length === 1;
    this._seed = seed[0];
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let hasValue = false;
    let acc = this._seed;
    const source = await toArray(this._source, signal);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = await this._fn(<R>acc, item, offset, signal);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number, signal?: AbortSignal) => R | Promise<R>,
  seed?: never[]
): OperatorAsyncFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number, signal?: AbortSignal) => R | Promise<R>,
  seed?: R
): OperatorAsyncFunction<T, R>;
export function scanRight<T, R = T>(
  accumulator: (previousValue: R, currentValue: T, currentIndex: number, signal?: AbortSignal) => R | Promise<R>,
  ...seed: R[]
): OperatorAsyncFunction<T, R> {
  return function scanRightOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<R> {
    return new ScanRightAsyncIterable(source, accumulator, seed);
  };
}
