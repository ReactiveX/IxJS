import { IterableX } from '../iterablex.js';
import { ConcatIterable } from '../concat.js';
import { OperatorFunction } from '../../interfaces.js';

/**
 * Concatenates all inner iterable sequences, as long as the previous
 * iterable sequence terminated successfully.
 *
 * @template T The type of elements in the source sequence.
 * @returns {OperatorFunction<Iterable<T>, T>} An operator which concatenates all inner iterable sources.
 */
export function concatAll<T>(): OperatorFunction<Iterable<T>, T> {
  return function concatAllOperatorFunction(source: Iterable<Iterable<T>>): IterableX<T> {
    return new ConcatIterable<T>(source);
  };
}
