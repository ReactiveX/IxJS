import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export interface Timestamp<TSource> {
  time: number;
  value: TSource;
}

export class TimestampAsyncIterable<TSource> extends AsyncIterableX<Timestamp<TSource>> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    for await (const item of wrapWithAbort(this._source, signal)) {
      yield { time: Date.now(), value: item };
    }
  }
}

export function timestamp<TSource>(): OperatorAsyncFunction<TSource, Timestamp<TSource>> {
  return function timestampOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<Timestamp<TSource>> {
    return new TimestampAsyncIterable<TSource>(source);
  };
}
