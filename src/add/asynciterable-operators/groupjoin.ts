import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { GroupJoinAsyncIterable } from '../../asynciterable/operators/groupjoin';

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
  return new GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult>(
    this,
    inner,
    outerSelector,
    innerSelector,
    resultSelector
  );
}

AsyncIterableX.prototype.groupJoin = groupJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    groupJoin: typeof groupJoinProto;
  }
}
