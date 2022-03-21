import {
  toDOMStream as toDOMStreamOperator,
  ReadableBYOBStreamOptions,
  ReadableByteStreamOptions,
} from '../../asynciterable/todomstream';

import { UnaryFunction } from '../../interfaces';

export function toDOMStream<T>(
  strategy?: QueuingStrategy<T>
): UnaryFunction<AsyncIterable<T>, ReadableStream<T>>;
export function toDOMStream<T>(
  options: ReadableBYOBStreamOptions<Uint8Array>
): UnaryFunction<AsyncIterable<T>, ReadableStream<Uint8Array>>;
export function toDOMStream<T>(
  options: ReadableByteStreamOptions<Uint8Array>
): UnaryFunction<AsyncIterable<T>, ReadableStream<Uint8Array>>;
export function toDOMStream(
  options?: QueuingStrategy<any> | ReadableBYOBStreamOptions | ReadableByteStreamOptions
) {
  return function toDOMStreamOperatorFunction(source: AsyncIterable<any>) {
    if (!options || !('type' in options) || options['type'] !== 'bytes') {
      return toDOMStreamOperator(source, options as QueuingStrategy<any> | undefined);
    }
    return toDOMStreamOperator(
      source,
      options as ReadableBYOBStreamOptions | ReadableByteStreamOptions
    );
  };
}
