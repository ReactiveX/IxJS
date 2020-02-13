/**
 * Returns the element at a specified index in a sequence or undefined if the index is out of range.
 * @param {Iterable<T>} source The source sequence.
 * @param {number} index The zero-based index of the element to retrieve.
 * @return {T} undefined if the index is outside the bounds of the source sequence; otherwise, the element at the
 * specified position in the source sequence.
 */
export function elementAt<T>(source: Iterable<T>, index: number): T | undefined {
  let currentIndex = index;
  for (const item of source) {
    if (currentIndex === 0) {
      return item;
    }
    currentIndex--;
  }
  return undefined;
}
