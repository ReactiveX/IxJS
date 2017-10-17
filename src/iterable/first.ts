/**
 * Returns the first element in a sequence that satisfies a specified condition if provided, else
 * the first element in the sequence.
 * @param {Iterable<T>} source Source collection
 * @param {function:(value: T): boolean} [selector] An optional function to test each element for a condition.
 * @returns {T | undefined} The first element in the sequence that passes the test in the
 * specified predicate function if provided, else the first element. If there are no elements,
 * undefined is returned.
 */
export function first<T, S extends T>(
  source: Iterable<T>,
  predicate?: (value: T, index: number) => value is S
): S | undefined;
export function first<T>(
  source: Iterable<T>,
  predicate?: (value: T, index: number) => boolean
): T | undefined;
export function first<T>(
  source: Iterable<T>,
  predicate: (value: T, index: number) => boolean = () => true
): T | undefined {
  let i = 0;
  for (let item of source) {
    if (predicate(item, i++)) {
      return item;
    }
  }

  return undefined;
}
