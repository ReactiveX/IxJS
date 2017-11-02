import { AsyncIterableX } from './asynciterablex';
import { toArray } from './toarray';

export class ScanRightAsyncIterable<T, R> extends AsyncIterableX<R> {
  private _source: AsyncIterable<T>;
  private _fn: (acc: R, x: T, index: number) => R | Promise<R>;
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

  async *[Symbol.asyncIterator]() {
    let hasValue = false,
      acc = this._seed;
    const source = await toArray(this._source);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = await this._fn(<R>acc, item, offset);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: never[]
): AsyncIterableX<R>;
export function scanRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  seed?: R
): AsyncIterableX<R>;
export function scanRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R | Promise<R>,
  ...seed: R[]
): AsyncIterableX<R> {
  return new ScanRightAsyncIterable(source, accumulator, seed);
}
