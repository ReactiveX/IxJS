import { IterableX } from '../../iterable';
import { scan } from '../../iterable/scan';

export function scanProto<T>(
  this: Iterable<T>,
  accumulator: (acc: T, value: T, index: number) => T): IterableX<T>;
export function scanProto<T, R = T>(
  this: Iterable<T>,
  accumulator: (acc: R, value: T, index: number) => R,
  seed: R): IterableX<R>;
/**
 * @ignore
 */
export function scanProto<T, R = T>(
    this: Iterable<T>,
    accumulator: (acc: T | R, value: T, index: number) => R,
    seed?: T | R): IterableX<T | R> {
  return arguments.length === 2 ? scan(this, accumulator, seed) : scan(this, accumulator);
}

IterableX.prototype.scan = scanProto;

declare module '../../iterable' {
  interface IterableX<T> {
    scan: typeof scanProto;
  }
}
