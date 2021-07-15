import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class IgnoreElementsAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource> {
    throwIfAborted(signal);
    // eslint-disable-next-line no-empty
    for await (const _ of wrapWithAbort(this._source, signal)) {
    }
  }
}

/**
 * Ignores all elements in an async-iterable sequence leaving only the termination messages.
 *
 * @template TSource The type of the elements in the source sequence
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns an empty async-iterable sequence
 * that signals termination, successful or exceptional, of the source sequence.
 */
export function ignoreElements<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function ignoreElementsOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IgnoreElementsAsyncIterable<TSource>(source);
  };
}
