import { IterableX } from '../iterable';
import { createGrouping } from './_grouping';
import { identity } from '../internal/identity';

class JoinIterable<TOuter, TInner, TKey, TResult> extends IterableX<TResult> {
  private _outer: Iterable<TOuter>;
  private _inner: Iterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey;
  private _innerSelector: (value: TInner) => TKey;
  private _resultSelector: (outer: TOuter, inner: TInner) => TResult;

  constructor(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
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

  *[Symbol.iterator]() {
    const map = createGrouping(this._inner, this._innerSelector, identity);
    for (let outerElement of this._outer) {
      const outerKey = this._outerSelector(outerElement);
      if (map.has(outerKey)) {
        for (let innerElement of map.get(outerKey)!) {
          yield this._resultSelector(outerElement, innerElement);
        }
      }
    }
  }
}

export function innerJoin<TOuter, TInner, TKey, TResult>(
    outer: Iterable<TOuter>,
    inner: Iterable<TInner>,
    outerSelector: (value: TOuter) => TKey,
    innerSelector: (value: TInner) => TKey,
    resultSelector: (outer: TOuter, inner: TInner) => TResult): IterableX<TResult> {
  return new JoinIterable<TOuter, TInner, TKey, TResult>(
    outer,
    inner,
    outerSelector,
    innerSelector,
    resultSelector);
}
