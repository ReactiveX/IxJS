import { AsyncIterableX } from '../../asynciterable';
import { groupJoin } from '../../asynciterable/groupjoin';

export function groupJoinProto<TOuter, TInner, TKey, TResult>(
  this: AsyncIterable<TOuter>,
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey,
  innerSelector: (value: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => Promise<TResult>): AsyncIterableX<TResult> {
  return groupJoin(this, inner, outerSelector, innerSelector, resultSelector);
}

AsyncIterableX.prototype.groupJoin = groupJoinProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}