import { IterableX } from '../../iterable';
import { union } from '../../iterable/union';

export function unionProto<T>(
    this: IterableX<T>,
    right: IterableX<T>,
    cmp: (x: T, y: T) => boolean = (x, y) => x === y): IterableX<T> {
  return new IterableX(union(this, right, cmp));
}

IterableX.prototype.union = unionProto;

declare module '../../iterable' {
  interface IterableX<T> {
    union: typeof unionProto;
  }
}