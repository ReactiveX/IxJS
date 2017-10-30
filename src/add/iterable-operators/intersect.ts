import { IterableX } from '../../iterable/iterablex';
import { intersect } from '../../iterable/intersect';

/**
 * @ignore
 */
export function intersectProto<T>(
  this: IterableX<T>,
  second: IterableX<T>,
  comparer?: (x: T, y: T) => boolean
) {
  return intersect(this, second, comparer);
}

IterableX.prototype.intersect = intersectProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    intersect: typeof intersectProto;
  }
}
