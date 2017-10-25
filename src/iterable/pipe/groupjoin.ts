import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { GroupJoinIterable } from '../groupjoin';

export function groupJoin<TOuter, TInner, TKey, TResult>(
  inner: Iterable<TInner>,
  outerSelector: (value: TOuter) => TKey,
  innerSelector: (value: TInner) => TKey,
  resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult
): OperatorFunction<TOuter, TResult> {
  return function groupJoinOperatorFunction(outer: Iterable<TOuter>): IterableX<TResult> {
    return new GroupJoinIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector
    );
  };
}
