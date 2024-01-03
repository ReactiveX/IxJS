import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { SkipLastAsyncIterable } from '../../asynciterable/operators/skiplast.js';

/**
 * @ignore
 */
export function skipLastProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return new SkipLastAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.skipLast = skipLastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipLast: typeof skipLastProto;
  }
}
