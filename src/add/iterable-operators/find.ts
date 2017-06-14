import { IterableX } from '../../iterable';
import { find } from '../../iterable/find';

/**
 * @ignore
 */
export function findProto<T>(
    this: IterableX<T>,
    fn: (value: T, index: number) => boolean,
    thisArg?: any): T | undefined {
  return find(this, fn, thisArg);
}

IterableX.prototype.find = findProto;

declare module '../../iterable' {
  interface IterableX<T> {
    find: typeof findProto;
  }
}