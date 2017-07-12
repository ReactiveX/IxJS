import { AsyncIterableX } from '../asynciterable';

class ScanAsyncIterable<T, R> extends AsyncIterableX<R> {
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
    let i = 0, hasValue = false;
    for await (let item of this._source) {
      if (hasValue || (hasValue = this._hasSeed)) {
        this._seed = await this._fn(<R>this._seed, item, i++);
        yield this._seed;
      } else {
        this._seed = item;
        hasValue = true;
        i++;
      }
    }
  }
}

export function scan<T>(
  source: AsyncIterable<T>,
  accumulator: (acc: T, value: T, index: number) => T | Promise<T>): AsyncIterableX<T>;
export function scan<T, R = T>(
  source: AsyncIterable<T>,
  accumulator: (acc: R, value: T, index: number) => R | Promise<R>,
  seed: R): AsyncIterableX<R>;
export function scan<T, R = T>(
    source: AsyncIterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R | Promise<R>,
    ...args: (T | R)[]): AsyncIterableX<T | R> {
  return new ScanAsyncIterable(source, accumulator, ...args);
}
