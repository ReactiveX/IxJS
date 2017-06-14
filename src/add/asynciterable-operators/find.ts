import { AsyncIterableX } from '../../asynciterable';
import { find } from '../../asynciterable/find';

/**
 * @ignore
 */
export function findProto<T>(
    this: AsyncIterableX<T>,
    predicate: (value: T, index: number) => boolean | Promise<boolean>,
    thisArg?: any): Promise<T | undefined> {
  return find(this, predicate, thisArg);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}