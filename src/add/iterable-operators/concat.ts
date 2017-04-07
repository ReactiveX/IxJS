import { IterableImpl } from '../../iterable';
import { concat } from '../../iterable/concat';

function concatProto<T>(this: IterableImpl<T>, ...args: Iterable<T>[]) {
  return concat(this, ...args);
}
IterableImpl.prototype.concat =concatProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    concat: typeof concatProto;
  }
}
