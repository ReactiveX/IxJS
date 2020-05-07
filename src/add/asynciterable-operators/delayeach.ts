import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { DelayEachAsyncIterable } from '../../asynciterable/operators/delayeach';

export function delayEachProto<TSource>(
  this: AsyncIterableX<TSource>,
  dueTime: number
): AsyncIterableX<TSource> {
  return new DelayEachAsyncIterable<TSource>(this, dueTime);
}

AsyncIterableX.prototype.delayEach = delayEachProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    delayEach: typeof delayEachProto;
  }
}
