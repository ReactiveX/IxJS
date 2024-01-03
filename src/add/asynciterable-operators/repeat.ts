import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { RepeatAsyncIterable } from '../../asynciterable/operators/repeat.js';

/**
 * @ignore
 */
export function repeatProto<T>(this: AsyncIterableX<T>, count = -1): AsyncIterableX<T> {
  return new RepeatAsyncIterable<T>(this, count);
}

AsyncIterableX.prototype.repeat = repeatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    repeat: typeof repeatProto;
  }
}
