/**
 * This clas serves as the base for all operations which support [Symbol.iterator].
 */
export abstract class IterableX<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
}
