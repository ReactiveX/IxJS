import { AsyncIterableX } from '../asynciterablex';
import { createGrouping } from './_grouping';
import { empty } from '../empty';
import { from } from '../from';
import { identity } from '../../util/identity';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _innerSelector: (value: TInner, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _resultSelector: (
    outer: TOuter,
    inner: AsyncIterable<TInner>,
    signal?: AbortSignal
  ) => TResult | Promise<TResult>;

  constructor(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter, signal?: AbortSignal) => TKey | Promise<TKey>,
    innerSelector: (value: TInner, signal?: AbortSignal) => TKey | Promise<TKey>,
    resultSelector: (
      outer: TOuter,
      inner: AsyncIterable<TInner>,
      signal?: AbortSignal
    ) => TResult | Promise<TResult>
  ) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const map = await createGrouping(this._inner, this._innerSelector, identity, signal);
    for await (const outerElement of wrapWithAbort(this._outer, signal)) {
      const outerKey = await this._outerSelector(outerElement, signal);
      const innerElements = map.has(outerKey)
        ? <Iterable<TInner>>map.get(outerKey)
        : empty<TInner>();
      yield await this._resultSelector(outerElement, from(innerElements), signal);
    }
  }
}

export function groupJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter, signal?: AbortSignal) => TKey | Promise<TKey>,
  innerSelector: (value: TInner, signal?: AbortSignal) => TKey | Promise<TKey>,
  resultSelector: (
    outer: TOuter,
    inner: AsyncIterable<TInner>,
    signal?: AbortSignal
  ) => TResult | Promise<TResult>
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
