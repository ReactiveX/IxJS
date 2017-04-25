'use strict';

export function* of<T>(...args: T[]): Iterable<T> {
  yield* args;
}