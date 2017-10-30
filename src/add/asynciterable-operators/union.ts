import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { union } from '../../asynciterable/union';

/**
 * @ignore
 */
export function unionProto<T>(
  this: AsyncIterableX<T>,
  right: AsyncIterable<T>,
  comparer?: (x: T, y: T) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return union(this, right, comparer);
}

AsyncIterableX.prototype.union = unionProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    union: typeof unionProto;
  }
}
