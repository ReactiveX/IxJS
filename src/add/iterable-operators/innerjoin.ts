import { IterableX } from '../../iterable/iterablex';
import { innerJoin } from '../../iterable/operators/innerjoin';

/**
 * @ignore
 */
export function innerJoinProto<TOuter, TInner, TKey, TResult>(
  this: IterableX<TOuter>,
  inner: Iterable<TInner>,
  outerSelector: (value: TOuter) => TKey,
  innerSelector: (value: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: TInner) => TResult
): IterableX<TResult> {
  return innerJoin(inner, outerSelector, innerSelector, resultSelector)(this);
}

IterableX.prototype.innerJoin = innerJoinProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    innerJoin: typeof innerJoinProto;
  }
}
