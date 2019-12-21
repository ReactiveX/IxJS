import { IterableX } from '../../iterable/iterablex';
import { concatAll } from '../../iterable/operators/concatall';

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
