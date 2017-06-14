import { AsyncIterableX } from '../../asynciterable';
import { findIndex } from '../../asynciterable/findindex';

/**
 * @ignore
 */
export function findIndexProto<T>(
    this: AsyncIterableX<T>,
    predicate: (value: T, index: number) => boolean | Promise<boolean>,
    thisArg?: any): Promise<number> {
  return findIndex(this, predicate, thisArg);
}

AsyncIterableX.prototype.findIndex = findIndexProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    findIndex: typeof findIndexProto;
  }
}