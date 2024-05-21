import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { StartWithAsyncIterable } from '../../asynciterable/operators/startwith.js';

/**
 * @ignore
 */
export function startWithProto<T>(this: AsyncIterableX<T>, ...args: T[]) {
  return new StartWithAsyncIterable<T>(this, args);
}

AsyncIterableX.prototype.startWith = startWithProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    startWith: typeof startWithProto;
  }
}
