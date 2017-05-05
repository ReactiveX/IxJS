'use strict';

export async function* concatAll<TSource>(source: AsyncIterable<AsyncIterable<TSource>>) {
  for await (let outer of source) {
    yield* outer;
  }
}

export async function* _concatAll<TSource>(source: Iterable<AsyncIterable<TSource>>) {
  for (let outer of source) {
    yield* outer;
  }
}

export async function* concat<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterable<T> {
  return _concatAll([source, ...args]);
}

export async function* concatStatic<T>(...args: AsyncIterable<T>[]): AsyncIterable<T> {
  return _concatAll(args);
}