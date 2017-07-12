/**
 * Returns a number that represents how many elements in the specified sequence satisfy a condition if present,
 * else the number of items in the collection.
 * @param {Iterable<T>} source A sequence that contains elements to be tested and counted.
 * @param {function(value: T): boolean} [predicate] A function to test each element for a condition.
 */
export function count<T>(
    source: Iterable<T>,
    predicate: (value: T) => boolean = () => true): number {
  let i = 0;

  for (let item of source) {
    if (predicate(item)) {
      i++;
    }
  }

  return i;
}
