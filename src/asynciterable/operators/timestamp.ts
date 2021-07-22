import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

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
    throwIfAborted(signal);
    for await (const item of wrapWithAbort(this._source, signal)) {
      yield { time: Date.now(), value: item };
    }
  }
}

/**
 * Timestamps each element in an async-iterable sequence using the local system clock.
 *
 * @template TSource The type of the elements in the source sequence.
 * @returns {OperatorAsyncFunction<TSource, Timestamp<TSource>>} An async-iterable sequence with timestamp information on elements.
 */
export function timestamp<TSource>(): OperatorAsyncFunction<TSource, Timestamp<TSource>> {
  return function timestampOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<Timestamp<TSource>> {
    return new TimestampAsyncIterable<TSource>(source);
  };
}
