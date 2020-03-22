import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export interface TimeInterval<T> {
  value: T;
  elapsed: number;
}

export class TimeIntervalAsyncIterable<TSource> extends AsyncIterableX<TimeInterval<TSource>> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let last = Date.now();
    for await (const item of wrapWithAbort(this._source, signal)) {
      const now = Date.now();
      const span = now - last;
      last = now;
      yield { value: item, elapsed: span };
    }
  }
}

export function timeInterval<TSource>(): OperatorAsyncFunction<TSource, TimeInterval<TSource>> {
  return function timeIntervalOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TimeInterval<TSource>> {
    return new TimeIntervalAsyncIterable<TSource>(source);
  };
}
