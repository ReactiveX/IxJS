import { IterableX } from '../../iterable';
import { intersect } from '../../iterable/intersect';

function intersectProto<T>(
    this: IterableX<T>,
    second: IterableX<T>,
    cmp: (x: T, y: T) => boolean = (x, y) => x === y) {
  return new IterableX(intersect(this, second, cmp));
}

IterableX.prototype.intersect = intersectProto;

declare module '../../iterable' {
  interface IterableX<T> {
    intersect: typeof intersectProto;
  }
}