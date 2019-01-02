import { ReadableOptions } from 'stream';
import { BufferLike } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { IterableReadable } from '../../iterable/tonodestream';

/**
 * @ignore
 */
export function toNodeStreamProto<TSource>(this: Iterable<TSource>): IterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: Iterable<TSource>,
  options: ReadableOptions | { objectMode: true }
): IterableReadable<TSource>;
export function toNodeStreamProto<TSource extends BufferLike>(
  this: Iterable<TSource>,
  options: ReadableOptions | { objectMode: false }
): IterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: Iterable<any>,
  options?: ReadableOptions
): IterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new IterableReadable<TSource>(this, options)
    : new IterableReadable<TSource extends BufferLike ? TSource : any>(this, options);
}

IterableX.prototype.toNodeStream = toNodeStreamProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toNodeStream: typeof toNodeStreamProto;
  }
}
