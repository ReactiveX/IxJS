import { IterableX } from '../iterablex';
import { createGrouping } from './_grouping';
import { empty } from '../empty';
import { identity } from '../../util/identity';
import { OperatorFunction } from '../../interfaces';

/** @ignore */
export class GroupJoinIterable<TOuter, TInner, TKey, TResult> extends IterableX<TResult> {
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
    resultSelector: (outer: TOuter, inner: Iterable<TInner>) => TResult
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
      const innerElements = map.has(outerKey) ? <Iterable<TInner>>map.get(outerKey) : empty();
      yield this._resultSelector(outerElement, innerElements);
    }
  }
}

/**
 * Correlates the elements of two iterable sequences based on equality of keys and groups the results.
 *
 * @template TOuter The type of the elements of the first iterable sequence.
 * @template TInner The type of the elements of the second iterable sequence.
 * @template TKey The type of the keys returned by the key selector functions.
 * @template TResult The type of the result elements.
 * @param {Iterable<TInner>} inner The async-enumerable sequence to join to the first sequence.
 * @param {((value: TOuter) => TKey)} outerSelector A function to extract the join key from each
 * element of the first sequence.
 * @param {((value: TInner) => TKey)} innerSelector A function to extract the join key from each
 * element of the second sequence.
 * @param {((outer: TOuter, inner: Iterable<TInner>) => TResult)} resultSelector A function to create a result
 * element from an element from the first sequence and a collection of matching elements from the second sequence.
 * @returns {OperatorFunction<TOuter, TResult>} An operator that returns an iterable sequence that contains the result elements
 * that are obtained by performing a grouped join on two sequences.
 */
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
