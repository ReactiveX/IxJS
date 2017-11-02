import { IterableX } from './iterablex';
import { toArray } from './toarray';

export class ScanRightIterable<T, R> extends IterableX<R> {
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
    let hasValue = false,
      acc = this._seed;
    const source = toArray(this._source);
    for (let offset = source.length - 1; offset >= 0; offset--) {
      const item = source[offset];
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = this._fn(<R>acc, item, offset);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
      }
    }
  }
}

export function scanRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: never[]
): IterableX<R>;
export function scanRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  seed?: R
): IterableX<R>;
export function scanRight<T, R = T>(
  source: Iterable<T>,
  accumulator: (previousValue: R, currentValue: T, currentIndex: number) => R,
  ...seed: R[]
): IterableX<R> {
  return new ScanRightIterable(source, accumulator, seed);
}
