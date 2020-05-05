import { IterableX } from '../iterablex';
import { toArray } from '../toarray';
import { OperatorFunction } from '../../interfaces';
import { ScanOptions } from './scanoptions';

export class ScanRightIterable<T, R> extends IterableX<R> {
  private _source: Iterable<T>;
  private _fn: (acc: R, x: T, index: number) => R;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(source: Iterable<T>, options: ScanOptions<T, R>) {
    super();
    this._source = source;
    this._fn = options['callback'];
    this._hasSeed = options.hasOwnProperty('seed');
    this._seed = options['seed'];
  }

  *[Symbol.iterator]() {
    let hasValue = false;
    let acc = this._seed;
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

/**
 * Applies an accumulator function over an async-iterable sequence from the right and returns each intermediate result.
 * The specified seed value, if given, is used as the initial accumulator value.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 * @param {ScanOptions<T, R>} options The options including the accumulator function and seed.
 * @returns {OperatorAsyncFunction<T, R>} An async-enumerable sequence containing the accumulated values from the right.
 */
export function scanRight<T, R = T>(options: ScanOptions<T, R>): OperatorFunction<T, R> {
  return function scanRightOperatorFunction(source: Iterable<T>): IterableX<R> {
    return new ScanRightIterable(source, options);
  };
}
