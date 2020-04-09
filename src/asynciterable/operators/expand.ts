import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _selector: (
    value: TSource,
    signal?: AbortSignal
  ) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (
      value: TSource,
      signal?: AbortSignal
    ) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const q = [this._source];
    while (q.length > 0) {
      const src = q.shift();
      for await (const item of wrapWithAbort(src!, signal)) {
        const items = await this._selector(item, signal);
        q.push(items);
        yield item;
      }
    }
  }
}

/**
 * Expands (breadth first) the async-iterable sequence by recursively applying a selector function to generate more sequences at each recursion level.
 *
 * @export
 * @template TSource Source sequence element type.
 * @param {((
 *     value: TSource,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>)} selector Selector function to retrieve the next sequence to expand.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator which returns a sequence with results
 * from the recursive expansion of the source sequence.
 */
export function expand<TSource>(
  selector: (
    value: TSource,
    signal?: AbortSignal
  ) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function expandOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExpandAsyncIterable<TSource>(source, selector);
  };
}
