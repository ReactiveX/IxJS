import { AsyncIterableX } from '../asynciterable';
import { identityAsync } from '../internal/identity';
import { createGrouping } from './_grouping';

export class GroupedAsyncIterable<TKey, TValue> extends AsyncIterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this._source) {
      yield item;
    }
  }
}

export class GroupByAsyncIterable<TSource, TKey, TValue, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _elementSelector: (value: TSource) => TValue | Promise<TValue>;
  private _resultSelector: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>;

  constructor(
      source: AsyncIterable<TSource>,
      keySelector: (value: TSource) => TKey | Promise<TKey>,
      elementSelector: (value: TSource) => TValue | Promise<TValue>,
      resultSelector: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator]() {
    const map = await createGrouping(this._source, this._keySelector, this._elementSelector);
    for (let [key, values] of map) {
      yield await this._resultSelector(key, values);
    }
  }
}

export function groupByResultIdentityAsync<TKey, TValue>(key: TKey, values: Iterable<TValue>): any {
  return new GroupedAsyncIterable(key, values);
}

export function groupBy<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>): AsyncIterableX<GroupedAsyncIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>): AsyncIterableX<GroupedAsyncIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  source: AsyncIterable<TSource>,
  keySelector: (value: TSource) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource) => TValue | Promise<TValue>,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult>): AsyncIterableX<TResult>;
export function groupBy<TSource, TKey, TValue, TResult>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    elementSelector: (value: TSource) => TValue | Promise<TValue> = identityAsync,
    resultSelector: (key: TKey, values: Iterable<TValue>) => TResult | Promise<TResult> = groupByResultIdentityAsync): AsyncIterableX<TResult> {
  return new GroupByAsyncIterable<TSource, TKey, TValue, TResult>(source, keySelector, elementSelector, resultSelector);
}
