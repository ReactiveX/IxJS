/**
 * Returns the element at a specified index in a sequence or undefined if the index is out of range.
 *
 * @template T The type of the elements in the source sequence.
 * @param {Iterable<T>} source iterable sequence to return the element from.
 * @param {number} index The zero-based index of the element to retrieve.
 * @returns {(T | undefined)} An iterable sequence that produces the element at the specified
 * position in the source sequence, or undefined if the index is outside the bounds of the source sequence.
 */
export function elementAt<T>(source: Iterable<T>, index: number): T | undefined {
  let i = index;
  for (const item of source) {
    if (i === 0) {
      return item;
    }
    i--;
  }
  return undefined;
}
