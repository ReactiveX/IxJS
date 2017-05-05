import { IterableX } from '../../iterable';
import { intersect } from '../../iterable/intersect';

export function intersectProto<T>(
    this: IterableX<T>,
    second: IterableX<T>,
    comparer?: (x: T, y: T) => boolean) {
  return new IterableX(intersect(this, second, comparer));
}

IterableX.prototype.intersect = intersectProto;

declare module '../../iterable' {
  interface IterableX<T> {
    intersect: typeof intersectProto;
  }
}