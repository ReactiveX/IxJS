import { IterableImpl } from '../../iterable';
import { map } from '../../iterable/map';

 function mapProto<T, U>(this: IterableImpl<T>, fn: (value: T, index: number) => U, thisArg?: any): IterableImpl<U> {
  return map(this, fn, thisArg);
};

IterableImpl.prototype.map = mapProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    map: typeof mapProto;
  }
}