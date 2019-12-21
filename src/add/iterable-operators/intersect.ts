import { IterableX } from '../../iterable/iterablex';
import { intersect } from '../../iterable/operators/intersect';

/**
 * @ignore
 */
export function intersectProto<T>(
  this: IterableX<T>,
  second: IterableX<T>,
  comparer?: (x: T, y: T) => boolean
) {
  return intersect(second, comparer)(this);
}

IterableX.prototype.intersect = intersectProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    intersect: typeof intersectProto;
  }
}
