import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import {
  toDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions,
} from '../../asynciterable/todomstream.js';

/**
 * @ignore
 */
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto<T>(
  this: AsyncIterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStreamProto(
  this: AsyncIterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  return !options ? toDOMStream(this) : toDOMStream(this, options);
}

AsyncIterableX.prototype.toDOMStream = toDOMStreamProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toDOMStream: typeof toDOMStreamProto;
  }
}
