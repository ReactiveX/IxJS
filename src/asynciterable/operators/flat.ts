import { AsyncIterableX } from '../asynciterablex';
import { isAsyncIterable } from '../../util/isiterable';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class FlattenAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _depth: number;

  constructor(source: AsyncIterable<TSource>, depth: number) {
    super();
    this._source = source;
    this._depth = depth;
  }

  // eslint-disable-next-line consistent-return
  private async *_flatten(
    source: AsyncIterable<TSource>,
    depth: number,
    signal?: AbortSignal
  ): AsyncIterable<TSource> {
    if (depth === 0) {
      for await (const item of wrapWithAbort(source, signal)) {
        yield item;
      }
      return undefined;
    }
    for await (const item of wrapWithAbort(source, signal)) {
      if (isAsyncIterable(item)) {
        for await (const innerItem of this._flatten(item, depth - 1, signal)) {
          yield innerItem;
        }
      } else {
        yield item;
      }
    }
  }

  [Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    return this._flatten(this._source, this._depth, signal)[Symbol.asyncIterator]();
  }
}

/**
 * Flattens the nested async-iterable by the given depth.
 *
 * @export
 * @template T The type of elements in the source sequence.
 * @param {number} [depth=Infinity] The depth to flatten the async-iterable sequence if specified, otherwise infinite.
 * @returns {MonoTypeOperatorAsyncFunction<T>} An operator that flattens the async-iterable sequence.
 */
export function flat<T>(depth = Infinity): MonoTypeOperatorAsyncFunction<T> {
  return function flattenOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new FlattenAsyncIterable<T>(source, depth);
  };
}
