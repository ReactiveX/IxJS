import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { EndWithAsyncIterable } from '../../asynciterable/operators/endwith';

/**
 * @ignore
 */
export function endWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return new EndWithAsyncIterable<T>(this, args);
}

AsyncIterableX.prototype.endWith = endWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    endWith: typeof endWithProto;
  }
}
