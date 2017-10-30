import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { take } from '../../asynciterable/take';

/**
 * @ignore
 */
export function takeProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return take(this, count);
}

AsyncIterableX.prototype.take = takeProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    take: typeof takeProto;
  }
}
