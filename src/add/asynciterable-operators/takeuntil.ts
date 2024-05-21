import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { TakeUntilAsyncIterable } from '../../asynciterable/operators/takeuntil.js';

/**
 * @ignore
 */
export function takeUntilProto<T>(
  this: AsyncIterableX<T>,
  other: (signal?: AbortSignal) => Promise<any>
): AsyncIterableX<T> {
  return new TakeUntilAsyncIterable<T>(this, other);
}

AsyncIterableX.prototype.takeUntil = takeUntilProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeUntil: typeof takeUntilProto;
  }
}
