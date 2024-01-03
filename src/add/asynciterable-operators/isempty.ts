import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { isEmpty } from '../../asynciterable/isempty.js';

/**
 * @ignore
 */
export function isEmptyProto<T>(this: AsyncIterableX<T>): Promise<boolean> {
  return isEmpty(this);
}

AsyncIterableX.prototype.isEmpty = isEmptyProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    isEmpty: typeof isEmptyProto;
  }
}
