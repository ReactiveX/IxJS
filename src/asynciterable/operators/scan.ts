import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { ScanOptions } from './scanoptions';

export class ScanAsyncIterable<T, R> extends AsyncIterableX<R> {
  private _source: AsyncIterable<T>;
  private _fn: (acc: R, x: T, index: number, signal?: AbortSignal) => R | Promise<R>;
  private _seed?: T | R;
  private _hasSeed: boolean;

  constructor(source: AsyncIterable<T>, options: ScanOptions<T, R>) {
    super();
    this._source = source;
    this._fn = options['callback'];
    this._hasSeed = options.hasOwnProperty('seed');
    this._seed = options['seed'];
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let i = 0;
    let hasValue = false;
    let acc = this._seed;
    for await (const item of wrapWithAbort(this._source, signal)) {
      if (hasValue || (hasValue = this._hasSeed)) {
        acc = await this._fn(<R>acc, item, i++, signal);
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

export function scan<T, R = T>(options: ScanOptions<T, R>): OperatorAsyncFunction<T, R> {
  return function scanOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<R> {
    return new ScanAsyncIterable(source, options);
  };
}
