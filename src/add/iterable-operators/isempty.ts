import { IterableX } from '../../iterable';
import { isEmpty } from '../../iterable/isempty';

/**
 * @ignore
 */
export function isEmptyProto<T>(this: IterableX<T>): boolean {
  return isEmpty(this);
}

IterableX.prototype.isEmpty = isEmptyProto;

declare module '../../iterable' {
  interface IterableX<T> {
    isEmpty: typeof isEmptyProto;
  }
}