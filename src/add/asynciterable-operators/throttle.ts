import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { throttle } from '../../asynciterable/operators/throttle';

/**
 * @ignore
 */
export function throttleProto<T>(this: AsyncIterableX<T>, time: number): AsyncIterableX<T> {
  return throttle<T>(time)(this);
}

AsyncIterableX.prototype.throttle = throttleProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    throttle: typeof throttleProto;
  }
}
