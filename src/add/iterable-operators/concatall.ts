import { IterableX } from '../../iterable/iterablex';
import { concatAll } from '../../iterable/concatall';

/**
 * @ignore
 */
export function concatAllProto<T>(this: IterableX<Iterable<T>>): IterableX<T> {
  return concatAll(this);
}

IterableX.prototype.concatAll = concatAllProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
