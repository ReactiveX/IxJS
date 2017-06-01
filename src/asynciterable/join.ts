'use strict';

import { AsyncIterableX } from '../asynciterable';
import { createGrouping } from './_grouping';
import { identity } from '../internal/identity';

class JoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey;
  private _innerSelector: (value: TInner) => TKey;
  private _resultSelector: (outer: TOuter, inner: TInner) => TResult;

  constructor(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: TInner) => TResult) {
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
      const outerKey = this._outerSelector(outerElement);
      if (map.has(outerKey)) {
        for (let innerElement of map.get(outerKey)!) {
          yield this._resultSelector(outerElement, innerElement);
        }
      }
    }
  }
}

export function join<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): AsyncIterableX<TResult> {
  return new JoinAsyncIterable<TOuter, TInner, TKey, TResult>(
    outer,
    inner,
    outerSelector,
    innerSelector,
    resultSelector);
}