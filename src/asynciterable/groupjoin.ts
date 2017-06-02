'use strict';

import { AsyncIterableX } from '../asynciterable';
import { createGrouping } from './_grouping';
import { empty } from './empty';
import { from } from './from';
import { identity } from '../internal/identity';

class GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey;
  private _innerSelector: (value: TInner) => TKey;
  private _resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => Promise<TResult>;

  constructor(
      outer: AsyncIterable<TOuter>,
      inner: AsyncIterable<TInner>,
      outerSelector: (value: TOuter) => TKey,
      innerSelector: (value: TInner) => TKey,
      resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => Promise<TResult>) {
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
      const innerElements = map.has(outerKey) ? from<TInner, TInner>(map.get(outerKey)!) : empty<TInner>();
      yield this._resultSelector(outerElement, innerElements);
    }
  }
}

export function groupJoin<TOuter, TInner, TKey, TResult>(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => Promise<TResult>): AsyncIterableX<TResult> {
  return new GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult>(
    outer,
    inner,
    outerSelector,
    innerSelector,
    resultSelector);
}