import { AsyncIterableX } from '../../asynciterable';
import { toSet } from '../../asynciterable/toset';

/**
 * @ignore
 */
export function toSetProto<TSource>(this: AsyncIterableX<TSource>): Promise<Set<TSource>> {
  return toSet(this);
}

AsyncIterableX.prototype.toSet = toSetProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    toSet: typeof toSetProto;
  }
}