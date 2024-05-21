import { IterableX } from '../iterablex.js';
import { identity } from '../../util/identity.js';
import { createGrouping } from './_grouping.js';
import { OperatorFunction } from '../../interfaces.js';

/** @ignore */
/** @ignore */
export class GroupedIterable<TKey, TValue> extends IterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (const item of this._source) {
      yield item;
    }
  }
}

/** @ignore */
export class GroupByIterable<TSource, TKey, TValue> extends IterableX<
  GroupedIterable<TKey, TValue>
> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _elementSelector: (value: TSource) => TValue;

  constructor(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey,
    elementSelector: (value: TSource) => TValue
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
  }

  *[Symbol.iterator]() {
    const map = createGrouping(this._source, this._keySelector, this._elementSelector);
    for (const [key, values] of map) {
      yield new GroupedIterable<TKey, TValue>(key, values);
    }
  }
}

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource) => TKey
): OperatorFunction<TSource, GroupedIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey,
  elementSelector?: (value: TSource) => TValue
): OperatorFunction<TSource, GroupedIterable<TKey, TValue>>;
/**
 * Groups the elements of an async-iterable sequence and selects the resulting elements by using a specified function.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the grouping key computed for each element in the source sequence.
 * @template TValue The type of the elements within the groups computed for each element in the source sequence.
 * @param {((value: TSource) => TKey)} keySelector A function to extract the key for each element.
 * @param {((value: TSource) => TValue)} [elementSelector=identity] A function to map each source element to an element in an async-enumerable group.
 * @returns {OperatorFunction<TSource, TResult>} A sequence of async-iterable groups, each of which corresponds to a unique key value,
 * containing all elements that share that same key value.
 */
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource) => TKey,
  elementSelector: (value: TSource) => TValue = identity
): OperatorFunction<TSource, GroupedIterable<TKey, TValue>> {
  return function groupByOperatorFunction(
    source: Iterable<TSource>
  ): IterableX<GroupedIterable<TKey, TValue>> {
    return new GroupByIterable<TSource, TKey, TValue>(source, keySelector, elementSelector);
  };
}
