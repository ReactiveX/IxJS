import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { union } from '../../asynciterable/operators/union.js';

/**
 * @ignore
 */
export function unionProto<T>(
  this: AsyncIterableX<T>,
  right: AsyncIterable<T>,
  comparer?: (x: T, y: T) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return union(right, comparer)(this);
}

AsyncIterableX.prototype.union = unionProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    union: typeof unionProto;
  }
}
