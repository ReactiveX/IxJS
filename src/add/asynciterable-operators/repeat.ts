import { AsyncIterableX } from '../../asynciterable';
import { repeat } from '../../asynciterable/repeat';

/**
 * @ignore
 */
export function repeatProto<TSource>(
    this: AsyncIterableX<TSource>,
    count: number = -1): AsyncIterableX<TSource> {
  return repeat(this, count);
}

AsyncIterableX.prototype.repeat = repeatProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    repeat: typeof repeatProto;
  }
}