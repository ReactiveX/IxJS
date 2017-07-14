import { IterableX } from '../iterable';
import { createGrouping } from './_grouping';
import { empty } from './empty';
import { identity } from '../internal/identity';

class GroupJoinIterable<TOuter, TInner, TKey, TResult> extends IterableX<TResult> {
  private _outer: Iterable<TOuter>;
  private _inner: Iterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey;
  private _innerSelector: (value: TInner) => TKey;
  private _resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult;

  constructor(
      outer: Iterable<TOuter>,
      inner: Iterable<TInner>,
      outerSelector: (value: TOuter) => TKey,
      innerSelector: (value: TInner) => TKey,
      resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
  }

  *[Symbol.iterator]() {
    const map = createGrouping(this._inner, this._innerSelector, identity);
    for (let outerElement of this._outer) {
      const outerKey = this._outerSelector(outerElement);
      const innerElements = map.has(outerKey) ? <Iterable<TInner>>map.get(outerKey) : empty<TInner>();
      yield this._resultSelector(outerElement, innerElements);
    }
  }
}

export function groupJoin<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult): IterableX<TResult> {
  return new GroupJoinIterable<TOuter, TInner, TKey, TResult>(
    outer,
    inner,
    outerSelector,
    innerSelector,
    resultSelector);
}
