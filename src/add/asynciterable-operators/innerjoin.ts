import { AsyncIterableX } from '../../asynciterable';
import { innerJoin } from '../../asynciterable/innerjoin';

/**
 * @ignore
 */
export function innerJoinProto<TOuter, TInner, TKey, TResult>(
    this: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return innerJoin(this, inner, outerSelector, innerSelector, resultSelector);
}

AsyncIterableX.prototype.innerJoin = innerJoinProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    innerJoin: typeof innerJoinProto;
  }
}