import { IterableX } from '../../iterable/iterablex';
import { findIndex } from '../../iterable/findindex';
import { FindOptions } from '../../iterable/findoptions';

/**
 * @ignore
 */
export function findIndexProto<T>(this: IterableX<T>, options: FindOptions<T>): number {
  return findIndex(this, options);
}

IterableX.prototype.findIndex = findIndexProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    findIndex: typeof findIndexProto;
  }
}
