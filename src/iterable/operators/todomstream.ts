import { toDOMStream as toDOMStreamOperator } from '../../iterable/todomstream.js';
import {
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions,
} from '../../asynciterable/todomstream.js';

import { UnaryFunction } from '../../interfaces.js';

export function toDOMStream<T>(
  strategy?: QueuingStrategy<T>
): UnaryFunction<Iterable<T>, ReadableStream<T>>;
export function toDOMStream<T>(
  options: ReadableBYOBStreamOptions<Uint8Array>
): UnaryFunction<Iterable<T>, ReadableStream<Uint8Array>>;
export function toDOMStream<T>(
  options: ReadableByteStreamOptions<Uint8Array>
): UnaryFunction<Iterable<T>, ReadableStream<Uint8Array>>;
export function toDOMStream(
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  return function toDOMStreamOperatorFunction(source: Iterable<any>) {
    if (!options || !('type' in options) || options['type'] !== 'bytes') {
      return toDOMStreamOperator(source, options as QueuingStrategy<any> | undefined);
    }
    return toDOMStreamOperator(
      source,
      options as ReadableBYOBStreamOptions | ReadableByteStreamOptions
    );
  };
}
