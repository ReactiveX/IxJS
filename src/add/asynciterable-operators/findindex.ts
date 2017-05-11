import { AsyncIterableX } from '../../asynciterable';
import { findIndex } from '../../asynciterable/findindex';

export function findIndexProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): Promise<number> {
  return findIndex(this, fn, thisArg);
}

AsyncIterableX.prototype.findIndex = findIndexProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    findIndex: typeof findIndexProto;
  }
}