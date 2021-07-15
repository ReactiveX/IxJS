import { comparer as defaultComparer } from '../util/comparer';

/**
 * The options for sequence equal operations including a comparer and abort signal
 *
 * @interface SequencEqualOptions
 * @template T The type of items to compare.
 */
export interface SequencEqualOptions<T> {
  /**
   * The comparer function which returns true if the items are equal, false otherwise.
   *
   * @memberof SequencEqualOptions
   */
  comparer?: (first: T, second: T) => boolean;
}

/**
 * Determines whether two sequences are equal by comparing the elements pairwise.
 *
 * @template T The type of the elements in the source sequence.
 * @param {Iterable<T>} source First iterable sequence to compare.
 * @param {Iterable<T>} other Second iterable sequence to compare.
 * @param {SequencEqualOptions<T>} [options] The sequence equal options which include an optional comparer and optional abort signal.
 * @returns {boolean} A promise which indicates whether both sequences are of equal length and their
 * corresponding elements are equal.
 */
export function sequenceEqual<T>(
  source: Iterable<T>,
  other: Iterable<T>,
  options?: SequencEqualOptions<T>
): boolean {
  const { ['comparer']: comparer = defaultComparer } = options || {};
  const it1 = source[Symbol.iterator]();
  const it2 = other[Symbol.iterator]();
  let next1: IteratorResult<T>;
  let next2: IteratorResult<T>;
  while (!(next1 = it1.next()).done) {
    if (!(!(next2 = it2.next()).done && comparer(next1.value, next2.value))) {
      return false;
    }
  }

  return !!it2.next().done;
}
