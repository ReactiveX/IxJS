import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ReverseAsyncIterable } from '../../asynciterable/operators/reverse';

/**
 * @ignore
 */
export function reverseProto<T>(this: AsyncIterableX<T>): AsyncIterableX<T> {
  return new ReverseAsyncIterable<T>(this);
}

AsyncIterableX.prototype.reverse = reverseProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    reverse: typeof reverseProto;
  }
}
