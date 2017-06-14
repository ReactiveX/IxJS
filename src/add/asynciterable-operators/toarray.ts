import { AsyncIterableX } from '../../asynciterable';
import { toArray } from '../../asynciterable/toarray';

/**
 * @ignore
 */
export function toArrayProto<TSource>(this: AsyncIterableX<TSource>): Promise<TSource[]> {
  return toArray(this);
}

AsyncIterableX.prototype.toArray = toArrayProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    toArray: typeof toArrayProto;
  }
}
