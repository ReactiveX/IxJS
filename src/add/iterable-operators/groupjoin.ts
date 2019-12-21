import { IterableX } from '../../iterable/iterablex';
import { groupJoin } from '../../iterable/operators/groupjoin';

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
  return groupJoin(inner, outerSelector, innerSelector, resultSelector)(this);
}

IterableX.prototype.groupJoin = groupJoinProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}
