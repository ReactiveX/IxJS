import { IterableX } from '../../iterable';
import { concat } from '../../iterable/concat';

export function concatProto<T>(this: IterableX<T>, ...args: Iterable<T>[]): IterableX<T> {
  return concat(this, ...args);
}

IterableX.prototype.concat = concatProto;

declare module '../../iterable' {
  interface IterableX<T> {
    concat: typeof concatProto;
  }
}
