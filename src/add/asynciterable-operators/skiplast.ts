import { AsyncIterableX } from '../../asynciterable';
import { skipLast } from '../../asynciterable/skiplast';

export function skipLastProto<T>(
    this: AsyncIterableX<T>,
    count: number): AsyncIterableX<T> {
  return skipLast(this, count);
}

AsyncIterableX.prototype.skipLast = skipLastProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skipLast: typeof skipLastProto;
  }
}