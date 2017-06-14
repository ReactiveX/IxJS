import { AsyncIterableX } from '../../asynciterable';
import { join } from '../../asynciterable/join';

/**
 * @ignore
 */
export function joinProto<TOuter, TInner, TKey, TResult>(
    this: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return join(this, inner, outerSelector, innerSelector, resultSelector);
}

AsyncIterableX.prototype.join = joinProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    join: typeof joinProto;
  }
}