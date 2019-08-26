import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { take } from '../../asynciterable/operators/take';

/**
 * @ignore
 */
export function takeProto<T>(this: AsyncIterableX<T>, count: number): AsyncIterableX<T> {
  return take<T>(count)(this);
}

AsyncIterableX.prototype.take = takeProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    take: typeof takeProto;
  }
}
