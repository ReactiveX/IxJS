import { AsyncIterableX } from '../../asynciterable';
import { take } from '../../asynciterable/take';

/**
 * @ignore
 */
export function takeProto<T>(
    this: AsyncIterableX<T>,
    count: number): AsyncIterableX<T> {
  return take(this, count);
}

AsyncIterableX.prototype.take = takeProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    take: typeof takeProto;
  }
}