import { AsyncIterableX } from '../asynciterable/asynciterablex';
import {
  toDOMStream as asyncIterableToDOMStream,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions
} from '../asynciterable/todomstream';

// To work around circular-dependency hell, these need to be on
// the AsyncIterable prototype for tee, pipeTo, and pipeThrough
import '../add/iterable-operators/publish';
import '../add/iterable-operators/todomstream';

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
    return asyncIterableToDOMStream(AsyncIterableX.from(source), options);
  }
  return asyncIterableToDOMStream(AsyncIterableX.from(source), options);
}
