import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { throttle } from '../../asynciterable/throttle';

/**
 * @ignore
 */
export function throttleProto<T>(this: AsyncIterableX<T>, time: number): AsyncIterableX<T> {
  return throttle(this, time);
}

AsyncIterableX.prototype.throttle = throttleProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    throttle: typeof throttleProto;
  }
}
