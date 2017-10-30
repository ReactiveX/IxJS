import { IterableX } from '../../iterable/iterablex';
import { findIndex } from '../../iterable/findindex';

/**
 * @ignore
 */
export function findIndexProto<T>(
  this: IterableX<T>,
  fn: (value: T, index: number) => boolean,
  thisArg?: any
): number {
  return findIndex(this, fn, thisArg);
}

IterableX.prototype.findIndex = findIndexProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    findIndex: typeof findIndexProto;
  }
}
