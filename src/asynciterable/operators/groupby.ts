import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { identityAsync } from '../../util/identity';
import { createGrouping } from './_grouping';
import { OperatorAsyncFunction } from '../../interfaces';

export class GroupedAsyncIterable<TKey, TValue> extends AsyncIterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for (const item of this._source) {
      yield item;
    }
  }
}

export class GroupByAsyncIterable<TSource, TKey, TValue, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _elementSelector: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>;
  private _resultSelector: (
    key: TKey,
    values: Iterable<TValue>,
    signal?: AbortSignal
  ) => TResult | Promise<TResult>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
    elementSelector: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>,
    resultSelector: (
      key: TKey,
      values: Iterable<TValue>,
      signal?: AbortSignal
    ) => TResult | Promise<TResult>
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const map = await createGrouping(
      this._source,
      this._keySelector,
      this._elementSelector,
      signal
    );
    for (const [key, values] of map) {
      yield await this._resultSelector(key, values, signal);
    }
  }
}

export function groupByResultIdentityAsync<TKey, TValue>(key: TKey, values: Iterable<TValue>): any {
  return new GroupedAsyncIterable(key, values);
}

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector: (value: TSource) => TValue | Promise<TValue> = identityAsync,
  resultSelector: (
    key: TKey,
    values: Iterable<TValue>
  ) => TResult | Promise<TResult> = groupByResultIdentityAsync
): OperatorAsyncFunction<TSource, TResult> {
  return function groupByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new GroupByAsyncIterable<TSource, TKey, TValue, TResult>(
      source,
      keySelector,
      elementSelector,
      resultSelector
    );
  };
}
