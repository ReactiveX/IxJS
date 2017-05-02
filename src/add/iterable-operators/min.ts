import { IterableX } from '../../iterable';
import { min } from '../../iterable/min';

function minProto<T>(
    this: IterableX<T>,
    fn: (x: T) => number): number {
  return min(this, fn);
}

IterableX.prototype.min = minProto;

declare module '../../iterable' {
  interface IterableX<T> {
    min: typeof minProto;
  }
}