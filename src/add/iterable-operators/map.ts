import { IterableX } from '../../iterable';
import { map } from '../../iterable/map';

export function mapProto<T, U>(this: IterableX<T>, fn: (value: T, index: number) => U, thisArg?: any): IterableX<U> {
  return map(this, fn, thisArg);
}

IterableX.prototype.map = mapProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    map: typeof mapProto;
  }
}