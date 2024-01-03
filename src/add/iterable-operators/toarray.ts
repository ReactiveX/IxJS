import { IterableX } from '../../iterable/iterablex.js';
import { toArray } from '../../iterable/toarray.js';

/**
 * @ignore
 */
export function toArrayProto<TSource>(this: IterableX<TSource>): TSource[] {
  return toArray(this);
}

IterableX.prototype.toArray = toArrayProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toArray: typeof toArrayProto;
  }
}
