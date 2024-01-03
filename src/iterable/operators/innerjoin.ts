import { IterableX } from '../iterablex.js';
import { createGrouping } from './_grouping.js';
import { identity } from '../../util/identity.js';
import { OperatorFunction } from '../../interfaces.js';

/** @ignore */
export class JoinIterable<TOuter, TInner, TKey, TResult> extends IterableX<TResult> {
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
    resultSelector: (outer: TOuter, inner: TInner) => TResult
  ) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
  }

  *[Symbol.iterator]() {
    const map = createGrouping(this._inner, this._innerSelector, identity);
    for (const outerElement of this._outer) {
      const outerKey = this._outerSelector(outerElement);
      if (map.has(outerKey)) {
        for (const innerElement of map.get(outerKey)!) {
          yield this._resultSelector(outerElement, innerElement);
        }
      }
    }
  }
}

/**
 * Correlates the elements of two sequences based on matching keys.
 *
 * @template TOuter The type of the elements of the first iterable sequence.
 * @template TInner The type of the elements of the second iterable sequence.
 * @template TKey The type of the keys returned by the key selector functions.
 * @template TResult The type of the result elements.
 * @param {Iterable<TInner>} inner The async-enumerable sequence to join to the first sequence.
 * @param {((value: TOuter) => TKey)} outerSelector A function to extract the join key from each element
 * of the first sequence.
 * @param {((value: TInner) => TKey)} innerSelector A function to extract the join key from each element
 * of the second sequence.
 * @param {((outer: TOuter, inner: TInner) => TResult)} resultSelector A function to create a result element
 * from two matching elements.
 * @returns {OperatorFunction<TOuter, TResult>} An iterable sequence that has elements that are obtained by performing an inner join
 * on two sequences.
 */
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
