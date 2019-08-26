import { IterableX } from '../../iterable/iterablex';
import { toSet } from '../../iterable/toset';

/**
 * @ignore
 */
export function toSetProto<TSource>(this: IterableX<TSource>): Set<TSource> {
  return toSet(this);
}

IterableX.prototype.toSet = toSetProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    toSet: typeof toSetProto;
  }
}
