import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { publish } from '../../asynciterable/operators/publish';
import {
  toDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions
} from '../../asynciterable/todomstream';

AsyncIterableX.prototype.tee = function<T>(this: AsyncIterableX<T>) {
  return _getDOMStream(this).tee();
};

AsyncIterableX.prototype.pipeTo = function<T>(
  this: AsyncIterableX<T>,
  writable: WritableStream<T>,
  options?: PipeOptions
) {
  return _getDOMStream(this).pipeTo(writable, options);
};

AsyncIterableX.prototype.pipeThrough = function<T, R extends ReadableStream<any>>(
  this: AsyncIterableX<T>,
  duplex: { writable: WritableStream<T>; readable: R },
  options?: PipeOptions
) {
  return _getDOMStream(this).pipeThrough(duplex, options);
};

function _getDOMStream<T>(self: any) {
  return self._DOMStream || (self._DOMStream = self.pipe(publish<T>(), toDOMStream));
}

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
    tee(): [ReadableStream<T>, ReadableStream<T>];
    pipeTo(writable: WritableStream<T>, options?: PipeOptions): Promise<void>;
    pipeThrough<R extends ReadableStream<any>>(
      duplex: { writable: WritableStream<T>; readable: R },
      options?: PipeOptions
    ): ReadableStream<T>;
  }
}
