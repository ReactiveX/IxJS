import { IterableX } from '../../iterable';
import { toSet } from '../../iterable/toset';

/**
 * @ignore
 */
export function toSetProto<TSource>(this: IterableX<TSource>): Set<TSource> {
  return toSet(this);
}

IterableX.prototype.toSet = toSetProto;

declare module '../../iterable' {
  interface IterableX<T> {
    toSet: typeof toSetProto;
  }
}