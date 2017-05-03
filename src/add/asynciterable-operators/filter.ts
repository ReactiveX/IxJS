import { AsyncIterableX } from '../../asynciterable';
import { filter } from '../../asynciterable/filter';

export function filterProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): AsyncIterableX<T> {
  return new AsyncIterableX(filter<T>(this, fn, thisArg));
}

AsyncIterableX.prototype.filter = filterProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    filter: typeof filterProto;
  }
}