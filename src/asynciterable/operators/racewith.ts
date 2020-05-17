import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { RaceAsyncIterable } from '../race';

/**
 * Propagates the async sequence that reacts first.
 *
 * @export
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @return {MonoTypeOperatorAsyncFunction<TSource> } An async sequence that surfaces either of the given sequences, whichever reacted first.
 */
export function raceWith<TSource>(
  ...sources: AsyncIterable<TSource>[]
): MonoTypeOperatorAsyncFunction<TSource> {
  return function raceWithOperatorFunction(source: AsyncIterable<TSource>) {
    return new RaceAsyncIterable<TSource>([source, ...sources]);
  };
}
