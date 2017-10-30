import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { toSet } from '../../asynciterable/toset';

/**
 * @ignore
 */
export function toSetProto<TSource>(this: AsyncIterableX<TSource>): Promise<Set<TSource>> {
  return toSet(this);
}

AsyncIterableX.prototype.toSet = toSetProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toSet: typeof toSetProto;
  }
}
