import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TakeLastAsyncIterable } from '../../asynciterable/operators/takelast';

/**
 * @ignore
 */
export function takeLastProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return new TakeLastAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.takeLast = takeLastProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    takeLast: typeof takeLastProto;
  }
}
