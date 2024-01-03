import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { SkipUntilAsyncIterable } from '../../asynciterable/operators/skipuntil.js';

/**
 * @ignore
 */
export function skipUntilProto<T>(
  this: AsyncIterableX<T>,
  other: (signal?: AbortSignal) => Promise<any>
): AsyncIterableX<T> {
  return new SkipUntilAsyncIterable<T>(this, other);
}

AsyncIterableX.prototype.skipUntil = skipUntilProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    skipUntil: typeof skipUntilProto;
  }
}
