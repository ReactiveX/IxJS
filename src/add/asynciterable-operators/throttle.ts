import { AsyncIterableX } from '../../asynciterable';
import { throttle } from '../../asynciterable/throttle';

/**
 * @ignore
 */
export function throttleProto<T>(
    this: AsyncIterableX<T>,
    time: number): AsyncIterableX<T> {
  return throttle(this, time);
}

AsyncIterableX.prototype.throttle = throttleProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    throttle: typeof throttleProto;
  }
}