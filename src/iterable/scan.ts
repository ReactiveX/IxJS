import { IterableX } from './iterablex';

export class ScanIterable<T, R> extends IterableX<R> {
  private _source: Iterable<T>;
  private _fn: (acc: R, x: T, index: number) => R;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(source: Iterable<T>, fn: (acc: R, x: T, index: number) => R, seed: R[]) {
    super();
    this._source = source;
    this._fn = fn;
    this._hasSeed = seed.length === 1;
    this._seed = seed[0];
  }

  *[Symbol.iterator]() {
    let i = 0,
      hasValue = false,
      acc = this._seed;
    for (let item of this._source) {
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = this._fn(<R>acc, item, i++);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
        i++;
      }
    }
  }
}

export function scan<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): IterableX<R>;
export function scan<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): IterableX<R>;
export function scan<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): IterableX<R> {
  return new ScanIterable(source, accumulator, seed);
}
