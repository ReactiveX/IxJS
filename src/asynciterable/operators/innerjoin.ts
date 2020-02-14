import { AsyncIterableX } from '../asynciterablex';
import { createGrouping } from './_grouping';
import { identity } from '../../util/identity';
import { OperatorAsyncFunction } from '../../interfaces';
import { AbortError } from 'ix/util/aborterror';
import { wrapWithAbort } from './withabort';

export class JoinAsyncIterable<TOuter, TInner, TKey, TResult> extends AsyncIterableX<TResult> {
  private _outer: AsyncIterable<TOuter>;
  private _inner: AsyncIterable<TInner>;
  private _outerSelector: (value: TOuter) => TKey | Promise<TKey>;
  private _innerSelector: (value: TInner) => TKey | Promise<TKey>;
  private _resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>;
  private _signal?: AbortSignal;

  constructor(
    outer: AsyncIterable<TOuter>,
    inner: AsyncIterable<TInner>,
    outerSelector: (value: TOuter) => TKey | Promise<TKey>,
    innerSelector: (value: TInner) => TKey | Promise<TKey>,
    resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>,
    signal?: AbortError
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
    if (this._signal?.aborted) {
      throw new AbortError();
    }

    for await (const outerElement of wrapWithAbort(this._outer, this._signal)) {
      const outerKey = await this._outerSelector(outerElement);
      if (this._signal?.aborted) {
        throw new AbortError();
      }

      if (map.has(outerKey)) {
        for (const innerElement of map.get(outerKey)!) {
          const result = this._resultSelector(outerElement, innerElement);
          if (this._signal?.aborted) {
            throw new AbortError();
          }

          yield result;
        }
      }
    }
  }
}

export function innerJoin<TOuter, TInner, TKey, TResult>(
  inner: AsyncIterable<TInner>,
  outerSelector: (value: TOuter) => TKey | Promise<TKey>,
  innerSelector: (value: TInner) => TKey | Promise<TKey>,
  resultSelector: (outer: TOuter, inner: TInner) => TResult | Promise<TResult>,
  signal?: AbortSignal
): OperatorAsyncFunction<TOuter, TResult> {
  return function innerJoinOperatorFunction(outer: AsyncIterable<TOuter>): AsyncIterableX<TResult> {
    return new JoinAsyncIterable<TOuter, TInner, TKey, TResult>(
      outer,
      inner,
      outerSelector,
      innerSelector,
      resultSelector,
      signal
    );
  };
}
