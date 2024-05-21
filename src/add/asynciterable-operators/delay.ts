import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { DelayAsyncIterable } from '../../asynciterable/operators/delay.js';

export function delayProto<TSource>(
  this: AsyncIterableX<TSource>,
  dueTime: number
): AsyncIterableX<TSource> {
  return new DelayAsyncIterable<TSource>(this, dueTime);
}

AsyncIterableX.prototype.delay = delayProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    delay: typeof delayProto;
  }
}
