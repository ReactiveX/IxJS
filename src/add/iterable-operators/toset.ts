import { IterableX } from '../../iterable/iterablex.js';
import { toSet } from '../../iterable/toset.js';

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
