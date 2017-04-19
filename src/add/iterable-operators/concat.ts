import { IterableX } from '../../iterable';
import { concat } from '../../iterable/concat';

export function concatProto<T>(this: IterableX<T>, ...args: Iterable<T>[]) {
  return concat(this, ...args);
}
IterableX.prototype.concat = concatProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    concat: typeof concatProto;
  }
}
