import { IterableX } from '../../iterable';
import { scan } from '../../iterable/scan';

function scanProto<T, R>(
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