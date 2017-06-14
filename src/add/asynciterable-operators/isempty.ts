import { AsyncIterableX } from '../../asynciterable';
import { isEmpty } from '../../asynciterable/isempty';

/**
 * @ignore
 */
export function isEmptyProto<T>(this: AsyncIterableX<T>): Promise<boolean> {
  return isEmpty(this);
}

AsyncIterableX.prototype.isEmpty = isEmptyProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    isEmpty: typeof isEmptyProto;
  }
}