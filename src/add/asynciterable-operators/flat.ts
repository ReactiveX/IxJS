import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flat } from '../../asynciterable/operators/flat';

/**
 * @ignore
 */
export function flatProto<T>(this: AsyncIterableX<T>, depth?: number): AsyncIterableX<T> {
  return flat<T>(depth)(this);
}

AsyncIterableX.prototype.flat = flatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flat: typeof flatProto;
  }
}
