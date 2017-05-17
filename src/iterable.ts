'use strict';

export abstract class IterableX<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;
}