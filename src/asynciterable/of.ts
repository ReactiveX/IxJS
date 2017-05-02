'use strict';

export async function* of<T>(...args: T[]): AsyncIterable<T> {
  yield* args;
}