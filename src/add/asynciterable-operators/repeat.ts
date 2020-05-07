import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { RepeatAsyncIterable } from '../../asynciterable/operators/repeat';

/**
 * @ignore
 */
export function repeatProto<T>(this: AsyncIterableX<T>, count: number = -1): AsyncIterableX<T> {
  return new RepeatAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.repeat = repeatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    repeat: typeof repeatProto;
  }
}
