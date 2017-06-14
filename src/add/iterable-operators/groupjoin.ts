import { IterableX } from '../../iterable';
import { groupJoin } from '../../iterable/groupjoin';

/**
 * @ignore
 */
export function groupJoinProto<TOuter, TInner, TKey, TResult>(
    this: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult): IterableX<TResult> {
  return groupJoin(this, inner, outerSelector, innerSelector, resultSelector);
}

IterableX.prototype.groupJoin = groupJoinProto;

declare module '../../iterable' {
  interface IterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}