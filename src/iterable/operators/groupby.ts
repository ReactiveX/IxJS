import { IterableX } from '../iterablex';
import { identity } from '../../util/identity';
import { createGrouping } from './_grouping';
import { OperatorFunction } from '../../interfaces';

export class GroupedIterable<TKey, TValue> extends IterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  [Symbol.iterator]() {
    return this._source[Symbol.iterator]();
  }
}

export class GroupByIterable<TSource, TKey, TValue, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _elementSelector: (value: TSource) => TValue;
  private _resultSelector: (key: TKey, values: Iterable<TValue>) => TResult;

  constructor(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey,
    elementSelector: (value: TSource) => TValue,
    resultSelector: (key: TKey, values: Iterable<TValue>) => TResult
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
    this._resultSelector = resultSelector;
  }

  *[Symbol.iterator]() {
    const map = createGrouping(this._source, this._keySelector, this._elementSelector);
    for (let [key, values] of map) {
      yield this._resultSelector(key, values);
    }
  }
}

export function groupByResultIdentity<TKey, TValue>(key: TKey, values: Iterable<TValue>): any {
  return new GroupedIterable(key, values);
}

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource) => TKey
): OperatorFunction<TSource, GroupedIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue
): OperatorFunction<TSource, GroupedIterable<TKey, TValue>>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue,
  resultSelector?: (key: TKey, values: Iterable<TValue>) => TResult
): OperatorFunction<TSource, TResult>;
export function groupBy<TSource, TKey, TValue, TResult>(
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity,
  resultSelector: (key: TKey, values: Iterable<TValue>) => TResult = groupByResultIdentity
): OperatorFunction<TSource, TResult> {
  return function groupByOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new GroupByIterable<TSource, TKey, TValue, TResult>(
      source,
      keySelector,
      elementSelector,
      resultSelector
    );
  };
}
