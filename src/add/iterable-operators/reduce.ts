import { IterableX } from '../../iterable';
import { reduce } from '../../iterable/reduce';

export function reduceProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T, value: T, index: number) => T,
  seed?: T): T;
export function reduceProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T[], value: T, index: number) => T[],
  seed?: T[]): T[];
export function reduceProto<T, R>(
  this: IterableX<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed?: R): R;
/**
 * @ignore
 */
export function reduceProto<T, R>(
    this: IterableX<T>,
    fn: (acc: R, x: T, index: number) => R,
    seed?: T | R): T | R {
  return arguments.length === 2 ? reduce(this, fn, seed) : reduce(this, fn);
}

IterableX.prototype.reduce = reduceProto;

declare module '../../iterable' {
  interface IterableX<T> {
    reduce: typeof reduceProto;
  }
}
