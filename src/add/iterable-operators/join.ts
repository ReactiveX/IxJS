import { IterableX } from '../../iterable';
import { join } from '../../iterable/join';

export function joinProto<TOuter, TInner, TKey, TResult>(
    this: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): IterableX<TResult> {
  return join(this, inner, outerSelector, innerSelector, resultSelector);
}

IterableX.prototype.join = joinProto;

declare module '../../iterable' {
  interface IterableX<T> {
    join: typeof joinProto;
  }
}