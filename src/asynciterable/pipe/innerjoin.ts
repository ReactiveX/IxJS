import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { JoinAsyncIterable } from '../innerjoin';

export function innerJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>
): OperatorAsyncFunction<TOuter, TResult> {
  return function innerJoinOperatorFunction(outer: AsyncIterable<TOuter>): AsyncIterableX<TResult> {
    return new JoinAsyncIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector
    );
  };
}
