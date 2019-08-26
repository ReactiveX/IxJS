import { IterableX } from '../../iterable/iterablex';
import { isEmpty } from '../../iterable/isempty';

/**
 * @ignore
 */
export function isEmptyProto<T>(this: IterableX<T>): boolean {
  return isEmpty(this);
}

IterableX.prototype.isEmpty = isEmptyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    isEmpty: typeof isEmptyProto;
  }
}
