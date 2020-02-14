import { AsyncIterableX } from '../asynciterablex';
import { identityAsync } from '../../util/identity';
import { createGrouping } from './_grouping';
import { OperatorAsyncFunction } from '../../interfaces';
import { AbortError } from 'ix/util/aborterror';

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
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _elementSelector: (value: TSource) => TValue | Promise<TValue>;
  private _resultSelector: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    elementSelector: (value: TSource) => TValue | Promise<TValue>,
    resultSelector: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
    this._resultSelector = resultSelector;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const map = await createGrouping(
      this._source,
      this._keySelector,
      this._elementSelector,
      this._signal
    );
    for (const [key, values] of map) {
      const result = await this._resultSelector(key, values);
      if (this._signal?.aborted) {
        throw new AbortError();
      }

      yield result;
    }
  }
}

export function groupByResultIdentityAsync<TKey, TValue>(key: TKey, values: Iterable<TValue>): any {
  return new GroupedAsyncIterable(key, values);
}

export interface GroupByOptions<TSource, TKey, TValue = TSource> {
  keySelector: (value: TSource) => TKey | Promise<TKey>;
  elementSelector?: (value: TSource) => TValue | Promise<TValue>;
  signal?: AbortSignal;
}

export interface GroupByOptionsWithSelector<TSource, TKey, TValue, TResult> {
  keySelector: (value: TSource) => TKey | Promise<TKey>;
  elementSelector?: (value: TSource) => TValue | Promise<TValue>;
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>;
  signal?: AbortSignal;
}

export function groupBy<TSource, TKey>(
  options: GroupByOptions<TSource, TKey>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  options: GroupByOptions<TSource, TKey, TValue>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  options: GroupByOptionsWithSelector<TSource, TKey, TValue, TResult>
): OperatorAsyncFunction<TSource, TResult> {
  return function groupByOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new GroupByAsyncIterable<TSource, TKey, TValue, TResult>(
      source,
      options.keySelector,
      options.elementSelector || identityAsync,
      options.resultSelector || groupByResultIdentityAsync,
      options.signal
    );
  };
}
