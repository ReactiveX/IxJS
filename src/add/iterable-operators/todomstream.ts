import { IterableX } from '../../iterable/iterablex';
import { toDOMStream } from '../../iterable/todomstream';
import {
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions,
} from '../../asynciterable/todomstream';

/**
 * @ignore
 */
export function toDOMStreamProto<T>(
  this: Iterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStreamProto<T>(
  this: Iterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto<T>(
  this: Iterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto(
  this: Iterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  return !options ? toDOMStream(this) : toDOMStream(this, options);
}

IterableX.prototype.toDOMStream = toDOMStreamProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toDOMStream: typeof toDOMStreamProto;
  }
}
