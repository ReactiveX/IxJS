import { AsyncIterableX } from '../asynciterable';
import { toArray } from './toarray';

class ScanRightAsyncIterable<T, R> extends AsyncIterableX<R> {
  private _source: AsyncIterable<T>;
  private _fn: (acc: T | R, x: T, index: number) => R | Promise<R>;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(
      source: AsyncIterable<T>,
      fn: (acc: T | R, x: T, index: number) => R | Promise<R>,
      ...args: (T | R)[]) {
    super();
    this._source = source;
    this._fn = fn;
    this._hasSeed = args.length === 1;
    this._seed = args[0];
  }

  async *[Symbol.asyncIterator]() {
    let hasValue = false;
    const source = await toArray(this._source);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        this._seed = await this._fn(<R>this._seed, item, offset);
        yield this._seed;
      } else {
        this._seed = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T>(
  source: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): AsyncIterableX<T>;
export function scanRight<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): AsyncIterableX<R>;
export function scanRight<T, R = T>(
    source: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): AsyncIterableX<T | R> {
  return new ScanRightAsyncIterable(source, accumulator, ...args);
}
