import { IterableX } from '../../iterable';
import { skipLast } from '../../iterable/skiplast';

export function skipLastProto<T>(
    this: IterableX<T>,
    count: number): IterableX<T> {
  return new IterableX(skipLast(this, count));
}

IterableX.prototype.skipLast = skipLastProto;

declare module '../../iterable' {
  interface IterableX<T> {
    skipLast: typeof skipLastProto;
  }
}