import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { intersect } from '../../asynciterable/intersect';

/**
 * @ignore
 */
export function intersectProto<T>(
  this: AsyncIterableX<T>,
  second: AsyncIterable<T>,
  comparer?: (x: T, y: T) => boolean | Promise<boolean>
) {
  return intersect(this, second, comparer);
}

AsyncIterableX.prototype.intersect = intersectProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    intersect: typeof intersectProto;
  }
}
