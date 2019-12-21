import { IterableX } from '../../iterable/iterablex';
import { union } from '../../iterable/operators/union';

/**
 * @ignore
 */
export function unionProto<T>(
  this: IterableX<T>,
  right: Iterable<T>,
  comparer?: (x: T, y: T) => boolean
): IterableX<T> {
  return union<T>(right, comparer)(this);
}

IterableX.prototype.union = unionProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    union: typeof unionProto;
  }
}
