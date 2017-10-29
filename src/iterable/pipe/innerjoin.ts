import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { JoinIterable } from '../innerjoin';

export function innerJoin<TOuter, TInner, TKey, TResult>(
  inner: Iterable<TInner>,
  outerSelector: (value: TOuter) => TKey,
  innerSelector: (value: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: TInner) => TResult
): OperatorFunction<TOuter, TResult> {
  return function innerJoinOperatorFunction(outer: Iterable<TOuter>): IterableX<TResult> {
    return new JoinIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector
    );
  };
}
