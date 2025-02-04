import { AsyncIterableX } from '../asynciterablex.js';
import { identityAsync } from '../../util/identity.js';
import { createGrouping } from './_grouping.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
/** @ignore */
export class GroupedAsyncIterable<TKey, TValue> extends AsyncIterableX<TValue> {
  public readonly key: TKey;
  private _source: Iterable<TValue>;

  constructor(key: TKey, source: Iterable<TValue>) {
    super();
    this.key = key;
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    for await (const item of this._source) {
      yield item;
    }
  }
}

/** @ignore */
export class GroupByAsyncIterable<TSource, TKey, TValue> extends AsyncIterableX<
  GroupedAsyncIterable<TKey, TValue>
> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _elementSelector: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
    elementSelector: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._elementSelector = elementSelector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const map = await createGrouping(
      this._source,
      this._keySelector,
      this._elementSelector,
      signal
    );

    for (const [key, values] of map) {
      yield new GroupedAsyncIterable(key, values);
    }
  }
}

export function groupBy<TSource, TKey>(
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TSource>>;
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  elementSelector?: (value: TSource, signal?: AbortSignal) => TValue | Promise<TValue>
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TValue>>;
/**
 * Groups the elements of an async-iterable sequence and selects the resulting elements by using a specified function.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the grouping key computed for each element in the source sequence.
 * @template TValue The type of the elements within the groups computed for each element in the source sequence.
 * @param {((value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>)} keySelector A function to extract the key for each element.
 * @param {((
 *     value: TSource,
 *     signal?: AbortSignal
 *   ) => TValue | Promise<TValue>)} [elementSelector=identityAsync] A function to map each source element to an element in an async-enumerable group.
 * @returns {OperatorAsyncFunction<TSource, TResult>} A sequence of async-iterable groups, each of which corresponds to a unique key value,
 * containing all elements that share that same key value.
 */
export function groupBy<TSource, TKey, TValue>(
  keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
  elementSelector: (
    value: TSource,
    signal?: AbortSignal
  ) => TValue | Promise<TValue> = identityAsync
): OperatorAsyncFunction<TSource, GroupedAsyncIterable<TKey, TValue>> {
  return function groupByOperatorFunction(source) {
    return new GroupByAsyncIterable(source, keySelector, elementSelector);
  };
}
