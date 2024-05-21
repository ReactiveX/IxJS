import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { SkipAsyncIterable } from '../../asynciterable/operators/skip.js';

/**
 * @ignore
 */
export function skipProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return new SkipAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.skip = skipProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skip: typeof skipProto;
  }
}
