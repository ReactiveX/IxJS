import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { ReverseAsyncIterable } from '../../asynciterable/operators/reverse.js';

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
