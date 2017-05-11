import { AsyncIterableX } from '../../asynciterable';
import { skip } from '../../asynciterable/skip';

export function skipProto<T>(
    this: AsyncIterableX<T>,
    count: number): AsyncIterableX<T> {
  return new AsyncIterableX(skip(this, count));
}

AsyncIterableX.prototype.skip = skipProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    skip: typeof skipProto;
  }
}