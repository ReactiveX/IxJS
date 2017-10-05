import { AsyncIterableX } from '../../asynciterable';
import { find } from '../../asynciterable/find';
import { booleanAsyncPredicate } from '../../internal/predicates';

/**
 * @ignore
 */
export function findProto<T>(
    this: AsyncIterableX<T>,
    predicate: booleanAsyncPredicate<T>,
    thisArg?: any): Promise<T | undefined> {
  return find(this, predicate, thisArg);
}

AsyncIterableX.prototype.find = findProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    find: typeof findProto;
  }
}