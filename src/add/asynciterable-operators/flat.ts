import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { flat } from '../../asynciterable/operators/flat';

/**
 * @ignore
 */
export function flatProto<T, D extends number = -1>(this: AsyncIterableX<T>, depth: D = -1 as any) {
  return flat(depth)(this);
}

AsyncIterableX.prototype.flat = flatProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flat: typeof flatProto;
  }
}
