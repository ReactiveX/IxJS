import { AsyncIterableX } from '../asynciterable';
import { identityAsync } from '../internal/identity';
import { arrayIndexOfAsync } from '../internal/arrayindexof';
import { comparerAsync } from '../internal/comparer';

class DistinctAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: Iterable<TSource | PromiseLike <TSource>> | AsyncIterable <TSource>;
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;

  constructor(
      source: AsyncIterable<TSource>,
      keySelector: (value: TSource) => TKey | Promise<TKey>,
      comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let set = [];

    for await (let item of <AsyncIterable<TSource>>(this._source)) {
      let key = await this._keySelector(item);
      if (await arrayIndexOfAsync(set, key, this._comparer) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

export function distinct<TSource, TKey>(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey> = identityAsync,
    comparer: (x: TKey, y: TKey) => boolean | Promise<boolean> = comparerAsync): AsyncIterableX<TSource> {
  return new DistinctAsyncIterable<TSource, TKey>(source, keySelector, comparer);
}
