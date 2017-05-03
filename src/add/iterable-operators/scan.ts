import { IterableX } from '../../iterable';
import { scan } from '../../iterable/scan';

export function scanProto<T>(
  this: Iterable<T>,
  accumulator: (acc: T, value: T, index: number) => T,
  seed?: T): IterableX<T>;
export function scanProto<T>(
  this: IterableX<T>,
  accumulator: (acc: T[], value: T, index: number) => T[],
  seed?: T[]): IterableX<T[]>;
export function scanProto<T, R>(
  this: IterableX<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed?: R): IterableX<R>;
export function scanProto<T, R>(
    this: IterableX<T>,
    fn: (acc: T | R, x: T, index: number) => R,
    seed?: T | R): IterableX<R> {
  return new IterableX<R>(arguments.length === 3 ? scan<T, R>(this, fn, <R>seed) : scan<T, R>(this, fn));
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}