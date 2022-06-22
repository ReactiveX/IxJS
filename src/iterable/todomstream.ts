import { AsyncIterableX } from '../asynciterable/asynciterablex';
import { publish } from './operators/publish';
import { IterableX } from '../iterable/iterablex';
import {
  toDOMStream as asyncIterableToDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions,
} from '../asynciterable/todomstream';

export function toDOMStream<T>(
  source: Iterable<T>,
  strategy?: QueuingStrategy<T>
): ReadableStream<T>;
export function toDOMStream<T>(
  source: Iterable<T>,
  options: ReadableBYOBStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream<T>(
  source: Iterable<T>,
  options: ReadableByteStreamOptions<Uint8Array>
): ReadableStream<Uint8Array>;
export function toDOMStream(
  source: Iterable<any>,
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  if (!options || !('type' in options) || options['type'] !== 'bytes') {
    return asyncIterableToDOMStream(AsyncIterableX.as(source), options);
  }
  return asyncIterableToDOMStream(AsyncIterableX.as(source), options);
}

IterableX.prototype.tee = function <T>(this: IterableX<T>) {
  return _getDOMStream(this).tee();
};

IterableX.prototype.pipeTo = function <T>(
  this: IterableX<T>,
  writable: WritableStream<T>,
  options?: StreamPipeOptions
) {
  return _getDOMStream(this).pipeTo(writable, options);
};

IterableX.prototype.pipeThrough = function <T, R extends ReadableStream<any>>(
  this: IterableX<T>,
  duplex: { writable: WritableStream<T>; readable: R },
  options?: StreamPipeOptions
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

declare module '../iterable/iterablex' {
  interface IterableX<T> {
    toDOMStream: typeof toDOMStreamProto;
    tee(): [ReadableStream<T>, ReadableStream<T>];
    pipeTo(writable: WritableStream<T>, options?: StreamPipeOptions): Promise<void>;
    pipeThrough<R extends ReadableStream<any>>(
      duplex: { writable: WritableStream<T>; readable: R },
      options?: StreamPipeOptions
    ): R;
  }
}
