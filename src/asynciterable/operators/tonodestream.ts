import { ReadableOptions } from 'stream';
import { AsyncIterableReadable } from '../tonodestream';
import { BufferLike, UnaryFunction } from '../../interfaces';

export function toNodeStream<TSource>(): UnaryFunction<
  AsyncIterable<TSource>,
  AsyncIterableReadable<TSource>
>;
export function toNodeStream<TSource>(
  options: ReadableOptions & { objectMode: true }
): UnaryFunction<AsyncIterable<TSource>, AsyncIterableReadable<TSource>>;
export function toNodeStream<TSource extends BufferLike>(
  options: ReadableOptions & { objectMode: false }
): UnaryFunction<AsyncIterable<TSource>, AsyncIterableReadable<TSource>>;
export function toNodeStream<TSource>(
  options?: ReadableOptions
): UnaryFunction<AsyncIterable<TSource>, AsyncIterableReadable<TSource>> {
  return function toNodeStreamOperatorFunction(
    source: AsyncIterable<any>
  ): AsyncIterableReadable<TSource> {
    return !options || options.objectMode === true
      ? new AsyncIterableReadable<TSource>(source, options)
      : new AsyncIterableReadable<TSource extends BufferLike ? TSource : any>(source, options);
  };
}
