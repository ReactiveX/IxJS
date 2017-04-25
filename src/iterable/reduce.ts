'use strict';

/* tslint:disable:max-line-length */
export function reduce<T>(source: Iterable<T>, accumulator: (acc: T, value: T, index: number) => T, seed?: T): T;
export function reduce<T>(source: Iterable<T>, accumulator: (acc: T[], value: T, index: number) => T[], seed?: T[]): T[];
export function reduce<T, R>(source: Iterable<T>, accumulator: (acc: R, value: T, index: number) => R, seed?: R): R;
/* tslint:enable:max-line-length */

export function reduce<T, R>(
      source: Iterable<T>,
      fn: (acc: R, x: T, index: number) => R,
      seed?: T | R): T | R {
  const hasSeed = arguments.length === 3;
  let i = 0, hasValue = false;
  for (let item of source) {
    if (hasValue || (hasValue = hasSeed)) {
      seed = fn(<R>seed, item, i++);
    } else {
      seed = item;
      hasValue = true;
      i++;
    }
  }

  if (!hasValue) {
    throw new Error('Sequence contains no elements');
  }

  return seed!;
}