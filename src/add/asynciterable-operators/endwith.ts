import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { endWith } from '../../asynciterable/endwith';

/**
 * @ignore
 */
export function endWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return endWith(this, ...args);
}

AsyncIterableX.prototype.endWith = endWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    endWith: typeof endWithProto;
  }
}
