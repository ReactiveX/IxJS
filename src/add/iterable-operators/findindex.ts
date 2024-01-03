import { IterableX } from '../../iterable/iterablex.js';
import { findIndex } from '../../iterable/findindex.js';
import { FindOptions } from '../../iterable/findoptions.js';

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
