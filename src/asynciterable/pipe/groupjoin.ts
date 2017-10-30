import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { GroupJoinAsyncIterable } from '../groupjoin';

export function groupJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>
): OperatorAsyncFunction<TOuter, TResult> {
  return function groupJoinOperatorFunction(outer: AsyncIterable<TOuter>): AsyncIterableX<TResult> {
    return new GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector
    );
  };
}
