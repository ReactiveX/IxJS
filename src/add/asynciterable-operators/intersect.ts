import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { intersect } from '../../asynciterable/operators/intersect.js';

/**
 * @ignore
 */
export function intersectProto<T>(
  this: AsyncIterableX<T>,
  second: AsyncIterable<T>,
  comparer?: (x: T, y: T) => boolean | Promise<boolean>
) {
  return intersect(second, comparer)(this);
}

AsyncIterableX.prototype.intersect = intersectProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    intersect: typeof intersectProto;
  }
}
