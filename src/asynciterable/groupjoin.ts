import { AsyncIterableX } from '../asynciterable';
import { createGrouping } from './_grouping';
import { empty } from './empty';
import { from } from './from';
import { identity } from '../internal/identity';

class GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey | Promise<TKey>;
  private _innerSelector: (value: TInner) => TKey | Promise<TKey>;
  private _resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>;

  constructor(
      outer: AsyncIterable<TOuter>,
      inner: AsyncIterable<TInner>,
      outerSelector: (value: TOuter) => TKey | Promise<TKey>,
      innerSelector: (value: TInner) => TKey | Promise<TKey>,
      resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator]() {
    const map = await createGrouping(this._inner, this._innerSelector, identity);
    for await (let outerElement of this._outer) {
      const outerKey = await this._outerSelector(outerElement);
      const innerElements = map.has(outerKey) ? <Iterable<TInner>>map.get(outerKey) : empty<TInner>();
      yield await this._resultSelector(outerElement, from(innerElements));
    }
  }
}

export function groupJoin<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return new GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult>(
    outer,
    inner,
    outerSelector,
    innerSelector,
    resultSelector);
}
