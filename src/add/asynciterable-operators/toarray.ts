import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { toArray } from '../../asynciterable/toarray.js';

/**
 * @ignore
 */
export function toArrayProto<TSource>(this: AsyncIterableX<TSource>): Promise<TSource[]> {
  return toArray(this);
}

AsyncIterableX.prototype.toArray = toArrayProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toArray: typeof toArrayProto;
  }
}
