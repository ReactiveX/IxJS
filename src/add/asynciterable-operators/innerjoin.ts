import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { innerJoin } from '../../asynciterable/operators/innerjoin';

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
  return innerJoin(inner, outerSelector, innerSelector, resultSelector)(this);
}

AsyncIterableX.prototype.innerJoin = innerJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    innerJoin: typeof innerJoinProto;
  }
}
