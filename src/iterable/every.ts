/**
 * Determines whether every element of a sequence satisfy a condition.
 * @param {Iterable<T>} source Source sequence.
 * @param {function(value: T, index: number): boolean} comparer A function to test each element for a condition.
 * @return {boolean} true if every element of the source sequence passes the test in the specified predicate, or
 * if the sequence is empty; otherwise, false.
 */
export function every<T>(
    source: Iterable<T>,
    comparer: (value: T, index: number) => boolean): boolean {
  let i = 0;
  for (let item of source) {
    if (!comparer(item, i++)) { return false; }
  }
  return true;
}
