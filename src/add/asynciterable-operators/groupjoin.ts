import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { groupJoin } from '../../asynciterable/operators/groupjoin';

/**
 * @ignore
 */
export function groupJoinProto<TOuter, TInner, TKey, TResult>(
  this: AsyncIterableX<TOuter>,
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>
): AsyncIterableX<TResult> {
  return groupJoin(inner, outerSelector, innerSelector, resultSelector)(this);
}

AsyncIterableX.prototype.groupJoin = groupJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}
