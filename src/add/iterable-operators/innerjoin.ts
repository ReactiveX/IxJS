import { IterableX } from '../../iterable';
import { innerJoin } from '../../iterable/innerjoin';

/**
 * @ignore
 */
export function innerJoinProto<TOuter, TInner, TKey, TResult>(
    this: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): IterableX<TResult> {
  return innerJoin(this, inner, outerSelector, innerSelector, resultSelector);
}

IterableX.prototype.innerJoin = innerJoinProto;

declare module '../../iterable' {
  interface IterableX<T> {
    innerJoin: typeof innerJoinProto;
  }
}