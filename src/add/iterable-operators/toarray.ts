import { IterableX } from '../../iterable/iterablex';
import { toArray } from '../../iterable/toarray';

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
