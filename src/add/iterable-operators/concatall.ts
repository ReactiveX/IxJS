import { IterableX } from '../../iterable/iterablex.js';
import { concatAll } from '../../iterable/operators/concatall.js';

/**
 * @ignore
 */
export function concatAllProto<T>(this: IterableX<Iterable<T>>): IterableX<T> {
  return concatAll<T>()(this);
}

IterableX.prototype.concatAll = concatAllProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
