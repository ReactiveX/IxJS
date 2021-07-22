/**
 * This class holds the options for the distinct operator including a key selector and comparer.
 *
 * @interface DistinctOptions
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the discriminator key computed for each element in the source sequence.
 */
export interface DistinctOptions<TSource, TKey = TSource> {
  /**
   * A function to compute the comparison key for each element.
   *
   * @memberof DistinctOptions
   */
  keySelector?: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  /**
   * Equality comparer for source elements.
   *
   * @memberof DistinctOptions
   */
  comparer?: (x: TKey, y: TKey) => boolean | Promise<boolean>;
}
