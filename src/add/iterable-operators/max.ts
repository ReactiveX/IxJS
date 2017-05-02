import { IterableX } from '../../iterable';
import { max } from '../../iterable/max';

function maxProto<T>(
    this: IterableX<T>,
    fn: (x: T) => number): number {
  return max(this, fn);
}

IterableX.prototype.max = maxProto;

declare module '../../iterable' {
  interface IterableX<T> {
    max: typeof maxProto;
  }
}