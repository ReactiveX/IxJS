import { IterableX } from '../../iterable';
import { concatAll } from '../../iterable/concat';

/**
 * @ignore
 */
export function concatAllProto<T>(this: IterableX<Iterable<T>>): IterableX<T> {
  return concatAll(this);
}

IterableX.prototype.concatAll = concatAllProto;

declare module '../../iterable' {
  interface IterableX<T> {
    concatAll: typeof concatAllProto;
  }
}
