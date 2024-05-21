import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { TakeAsyncIterable } from '../../asynciterable/operators/take.js';

/**
 * @ignore
 */
export function takeProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return new TakeAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.take = takeProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    take: typeof takeProto;
  }
}
