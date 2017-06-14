import { IterableX } from '../../iterable';
import { union } from '../../iterable/union';

/**
 * @ignore
 */
export function unionProto<T>(
    this: IterableX<T>,
    right: Iterable<T>,
    comparer?: (x: T, y: T) => boolean): IterableX<T> {
  return union(this, right, comparer);
}

IterableX.prototype.union = unionProto;

declare module '../../iterable' {
  interface IterableX<T> {
    union: typeof unionProto;
  }
}