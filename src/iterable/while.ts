'use strict';

export function* _while<T>(
    source: Iterable<T>,
    condition: () => boolean): Iterable<T> {
  while (condition()) {
    yield* source;
  }
}