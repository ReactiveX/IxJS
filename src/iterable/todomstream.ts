import { from } from '../asynciterable/from';
import { publish } from './operators/publish';
import {
  toDOMStream as asyncIterableToDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions
} from '../asynciterable/todomstream';
import { IterableX } from '../iterable/iterablex';
import { AsyncIterableX } from '../asynciterable/asynciterablex';

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
    return asyncIterableToDOMStream(from(source), options);
  }
  return asyncIterableToDOMStream(from(source), options);
}

declare module '../iterable/iterablex' {
  interface IterableX<T> {
    toDOMStream(): ReadableStream<T>;
    tee(): [ReadableStream<T>, ReadableStream<T>];
    pipeTo(writable: WritableStream<T>, options?: PipeOptions): Promise<void>;
    pipeThrough<R extends ReadableStream<any>>(
      duplex: { writable: WritableStream<T>; readable: R },
      options?: PipeOptions
    ): ReadableStream<T>;
  }
}

IterableX.prototype.tee = AsyncIterableX.prototype.tee;
IterableX.prototype.pipeTo = AsyncIterableX.prototype.pipeTo;
IterableX.prototype.pipeThrough = AsyncIterableX.prototype.pipeThrough;
IterableX.prototype.toDOMStream = function<T>(this: any) {
  return (
    this._DOMStream ||
    (this._DOMStream = this.pipe(
      toDOMStream,
      publish<T>()
    ))
  );
};
