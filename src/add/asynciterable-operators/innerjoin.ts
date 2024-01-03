import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { JoinAsyncIterable } from '../../asynciterable/operators/innerjoin.js';

/**
 * @ignore
 */
export function innerJoinProto<TOuter, TInner, TKey, TResult>(
  this: AsyncIterableX<TOuter>,
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>
): AsyncIterableX<TResult> {
  return new JoinAsyncIterable<TOuter, TInner, TKey, TResult>(
    this,
    inner,
    outerSelector,
    innerSelector,
    resultSelector
  );
}

AsyncIterableX.prototype.innerJoin = innerJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    innerJoin: typeof innerJoinProto;
  }
}
