'use strict';

export function* _while<T>(condition: () => boolean, source: Iterable<T>): Iterable<T> {
  while (condition()) {
    yield* source;
  }
}