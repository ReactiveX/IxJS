import { IterableX } from '../../iterable/iterablex';
import { groupJoin } from '../../iterable/groupjoin';

/**
 * @ignore
 */
export function groupJoinProto<TOuter, TInner, TKey, TResult>(
  this: IterableX<TOuter>,
  inner: Iterable<TInner>,
  outerSelector: (value: TOuter) => TKey,
  innerSelector: (value: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult
): IterableX<TResult> {
  return groupJoin(this, inner, outerSelector, innerSelector, resultSelector);
}

IterableX.prototype.groupJoin = groupJoinProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}
