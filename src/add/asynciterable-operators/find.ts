import { AsyncIterableX } from '../../asynciterable';
import { find } from '../../asynciterable/find';

export function findProto<T>(
    this: AsyncIterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): Promise<T | undefined> {
  return find(this, fn, thisArg);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}