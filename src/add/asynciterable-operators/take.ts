import { AsyncIterableX } from '../../asynciterable';
import { take } from '../../asynciterable/take';

export function takeProto<T>(
    this: AsyncIterableX<T>,
    count: number): AsyncIterableX<T> {
  return new AsyncIterableX(take(this, count));
}

AsyncIterableX.prototype.take = takeProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    take: typeof takeProto;
  }
}