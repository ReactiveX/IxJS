import { ReadableOptions } from 'stream';
import { BufferLike } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { AsyncIterableReadable } from '../../asynciterable/tonodestream';

/**
 * @ignore
 */
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<TSource>
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: true }
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource extends BufferLike>(
  this: AsyncIterable<TSource>,
  options: ReadableOptions & { objectMode: false }
): AsyncIterableReadable<TSource>;
export function toNodeStreamProto<TSource>(
  this: AsyncIterable<any>,
  options?: ReadableOptions
): AsyncIterableReadable<TSource> {
  return !options || options.objectMode === true
    ? new AsyncIterableReadable<TSource>(this, options)
    : new AsyncIterableReadable<TSource extends BufferLike ? TSource : any>(this, options);
}

AsyncIterableX.prototype.toNodeStream = toNodeStreamProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toNodeStream: typeof toNodeStreamProto;
  }
}
