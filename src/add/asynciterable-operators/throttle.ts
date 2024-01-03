import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ThrottleAsyncIterable } from '../../asynciterable/operators/throttle.js';

/**
 * @ignore
 */
export function throttleProto<T>(this: AsyncIterableX<T>, time: number): AsyncIterableX<T> {
  return new ThrottleAsyncIterable<T>(this, time);
}

AsyncIterableX.prototype.throttle = throttleProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    throttle: typeof throttleProto;
  }
}
