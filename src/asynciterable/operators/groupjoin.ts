import { AsyncIterableX } from '../asynciterablex';
import { createGrouping } from './_grouping';
import { empty } from '../empty';
import { from } from '../from';
import { identity } from '../../util/identity';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../util/aborterror';

export class GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey | Promise<TKey>;
  private _innerSelector: (value: TInner) => TKey | Promise<TKey>;
  private _resultSelector: (
    outer: TOuter,
    inner: AsyncIterable<TInner>
  ) => TResult | Promise<TResult>;
  private _signal?: AbortSignal;

  constructor(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>,
    signal?: AbortSignal
  ) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerSelector = outerSelector;
    this._innerSelector = innerSelector;
    this._resultSelector = resultSelector;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const map = await createGrouping(this._inner, this._innerSelector, identity, this._signal);
    throwIfAborted(this._signal);

    for await (const outerElement of wrapWithAbort(this._outer, this._signal)) {
      const outerKey = await this._outerSelector(outerElement);
      throwIfAborted(this._signal);

      const innerElements = map.has(outerKey)
        ? <Iterable<TInner>>map.get(outerKey)
        : empty<TInner>();

      const result = await this._resultSelector(outerElement, from(innerElements));
      throwIfAborted(this._signal);

      yield result;
    }
  }
}

export function groupJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: AsyncIterable<TInner>) => TResult | Promise<TResult>,
  signal?: AbortSignal
): OperatorAsyncFunction<TOuter, TResult> {
  return function groupJoinOperatorFunction(outer: AsyncIterable<TOuter>): AsyncIterableX<TResult> {
    return new GroupJoinAsyncIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector,
      signal
    );
  };
}
