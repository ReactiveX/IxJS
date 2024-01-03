import { FlattenConcurrentAsyncIterable } from './_flatten.js';

/**
 * Merges elements from all inner async-iterable sequences into a single async-iterable sequence, emitting values only from the most recently projected async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequences.
 * @returns {OperatorAsyncFunction<AsyncIterable<TSource>, TSource>} The async-iterable sequence that merges the elements of the inner sequences.
 */
export function switchAll() {
  return function switchAllOperatorFunction<TSource>(
    source: AsyncIterable<AsyncIterable<TSource>>
  ) {
    return new FlattenConcurrentAsyncIterable(source, (s) => s, 1, true);
  };
}
