'use strict';

/* tslint:disable:max-line-length */
export function scan<T>(source: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, seed?: T): Iterable<T>;
export function scan<T>(source: Iterable<T>, accumulator: (acc: T[], value: T, index: number) => T[], seed?: T[]): Iterable<T[]>;
export function scan<T, R>(source: Iterable<T>, accumulator: (acc: R, value: T, index: number) => R, seed?: R): Iterable<R>;
/* tslint:enable:max-line-length */

export function* scan<T, R>(
      source: Iterable<T>,
      fn: (acc: T | R, x: T, index: number) => R,
      seed?: T | R): Iterable<R> {
  const hasSeed = arguments.length === 3;
  let i = 0, hasValue = false;
  for (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      seed = fn(<R>seed, item, i++);
      yield seed;
    } else {
      seed = item;
      hasValue = true;
      i++;
    }
  }
}