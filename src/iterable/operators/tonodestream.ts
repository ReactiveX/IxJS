import { ReadableOptions } from 'stream';
import { IterableReadable } from '../../iterable/tonodestream';
import { BufferLike, UnaryFunction } from '../../interfaces';

export function toNodeStream<TSource>(): UnaryFunction<
  Iterable<TSource>,
  IterableReadable<TSource>
>;
export function toNodeStream<TSource>(
  options: ReadableOptions & { objectMode: true }
): UnaryFunction<Iterable<TSource>, IterableReadable<TSource>>;
export function toNodeStream<TSource extends BufferLike>(
  options: ReadableOptions & { objectMode: false }
): UnaryFunction<Iterable<TSource>, IterableReadable<TSource>>;
export function toNodeStream<TSource>(
  options?: ReadableOptions
): UnaryFunction<Iterable<TSource>, IterableReadable<TSource>> {
  return function toNodeStreamOperatorFunction(source: Iterable<any>): IterableReadable<TSource> {
    return !options || options.objectMode === true
      ? new IterableReadable<TSource>(source, options)
      : new IterableReadable<TSource extends BufferLike ? TSource : any>(source, options);
  };
}
