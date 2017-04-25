'use strict';

export function* concatAll<TSource>(source: Iterable<Iterable<TSource>>) {
  for (let outer of source) {
    yield* outer;
  }
}

export function* concat<T>(source: Iterable<T>, ...args: Iterable<T>[]): Iterable<T> {
  return concatAll([source].concat(...args));
}

export function* concatStatic<T>(...args: Iterable<T>[]): Iterable<T> {
  return concatAll(args);
}