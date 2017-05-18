import { AsyncIterableX } from '../../asynciterable';
import { map } from '../../asynciterable/map';

export function mapProto<T, U>(
    this: AsyncIterableX<T>,
    fn: (value: T, index: number) => U,
    thisArg?: any): AsyncIterableX<U> {
  return map<T, U>(this, fn, thisArg);
}

AsyncIterableX.prototype.map = mapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    map: typeof mapProto;
  }
}