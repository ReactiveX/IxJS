import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';
import { ScanOptions } from './scanoptions';

export class ScanIterable<T, R> extends IterableX<R> {
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
    let i = 0;
    let hasValue = false;
    let acc = this._seed;
    for (const item of this._source) {
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = this._fn(<R>acc, item, i++);
        yield acc;
      } else {
        acc = item;
        hasValue = true;
        i++;
      }
    }
    if (i === 1 && !this._hasSeed) {
      yield acc as R;
    }
  }
}

export function scan<T, R = T>(options: ScanOptions<T, R>): OperatorFunction<T, R> {
  return function scanOperatorFunction(source: Iterable<T>): IterableX<R> {
    return new ScanIterable(source, options);
  };
}
