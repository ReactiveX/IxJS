import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class EndWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];

  constructor(source: AsyncIterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for await (const item of wrapWithAbort(this._source, signal)) {
      yield item;
    }
    for (const x of this._args) {
      yield x;
    }
  }
}

/**
 * Append values to an async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {...TSource[]} args The values to append to the end of the async-iterable sequence.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator which appends values to the end of the sequence.
 */
export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function endsWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new EndWithAsyncIterable<TSource>(source, args);
  };
}
