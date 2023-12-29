import { AsyncIterableX } from '../asynciterablex';
import { createGrouping } from './_grouping';
import { empty } from '../empty';
import { identity } from '../../util/identity';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

/** @ignore */
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
    throwIfAborted(signal);
    const map = await createGrouping(this._inner, this._innerSelector, identity, signal);
    for await (const outerElement of wrapWithAbort(this._outer, signal)) {
      const outerKey = await this._outerSelector(outerElement, signal);
      const innerElements = map.has(outerKey) ? <Iterable<TInner>>map.get(outerKey) : empty();
      yield await this._resultSelector(outerElement, AsyncIterableX.as(innerElements), signal);
    }
  }
}

/**
 * Correlates the elements of two async-iterable sequences based on equality of keys and groups the results.
 *
 * @template TOuter The type of the elements of the first async-iterable sequence.
 * @template TInner The type of the elements of the second async-iterable sequence.
 * @template TKey The type of the keys returned by the key selector functions.
 * @template TResult The type of the result elements.
 * @param {AsyncIterable<TInner>} inner The async-enumerable sequence to join to the first sequence.
 * @param {((value: TOuter, signal?: AbortSignal) => TKey | Promise<TKey>)} outerSelector A function to extract the join key from each
 * element of the first sequence.
 * @param {((value: TInner, signal?: AbortSignal) => TKey | Promise<TKey>)} innerSelector A function to extract the join key from each
 * element of the second sequence.
 * @param {((
 *     outer: TOuter,
 *     inner: AsyncIterable<TInner>,
 *     signal?: AbortSignal
 *   ) => TResult | Promise<TResult>)} resultSelector A function to create a result element from an element from the first sequence and a
 * collection of matching elements from the second sequence.
 * @returns {OperatorAsyncFunction<TOuter, TResult>} An operator that returns an async-iterable sequence that contains the result elements
 * that are obtained by performing a grouped join on two sequences.
 */
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
