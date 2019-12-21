import { AsyncIterableX } from '../asynciterablex';
import { identityAsync } from '../../util/identity';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class DistinctUntilChangedAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    comparer: (first: TKey, second: TKey) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let currentKey: TKey | undefined,
      hasCurrentKey = false;
    for await (let item of this._source) {
      let key = await this._keySelector(item);
      let comparerEquals = false;
      if (hasCurrentKey) {
        comparerEquals = await this._comparer(currentKey!, key);
      }
      if (!hasCurrentKey || !comparerEquals) {
        hasCurrentKey = true;
        currentKey = key;
        yield item;
      }
    }
  }
}

export function distinctUntilChanged<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey> = identityAsync,
  comparer: (first: TKey, second: TKey) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DistinctUntilChangedAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
