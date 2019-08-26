import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { endWith } from '../../asynciterable/operators/endwith';

/**
 * @ignore
 */
export function endWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return endWith<T>(...args)(this);
}

AsyncIterableX.prototype.endWith = endWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    endWith: typeof endWithProto;
  }
}
