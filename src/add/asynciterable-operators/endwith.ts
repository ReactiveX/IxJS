import { AsyncIterableX } from '../../asynciterable';
import { endWith } from '../../asynciterable/endwith';

/**
 * @ignore
 */
export function endWithProto<T>(
    this: AsyncIterableX<T>,
    ...args: T[]) {
  return endWith(this, ...args);
}

AsyncIterableX.prototype.endWith = endWithProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    endWith: typeof endWithProto;
  }
}
