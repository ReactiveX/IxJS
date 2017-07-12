import { IterableX } from '../iterable';
import { identity } from '../internal/identity';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

class DistinctIterable<TSource, TKey> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(source: Iterable<TSource>, keySelector: (value: TSource) => TKey, cmp: (x: TKey, y: TKey) => boolean) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._cmp = cmp;
  }

  *[Symbol.iterator]() {
    let set = [];

    for (let item of this._source) {
      let key = this._keySelector(item);
      if (arrayIndexOf(set, key, this._cmp) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

/**
 * Returns elements with a distinct key value by using the specified comparer to compare key values.
 * @param source Source sequence.
 * @param {function(value: TSource): TKey} [keySelector] Key selector.
 * @param {function(x: TKey, y: TKey): boolean} [comparer] Comparer used to compare key values.
 * @return {Iterable<T>} Sequence that contains the elements from the source sequence with distinct key values.
 */
export function distinct<TSource, TKey>(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey = identity,
    comparer: (x: TKey, y: TKey) => boolean = defaultComparer): IterableX<TSource> {
  return new DistinctIterable(source, keySelector, comparer);
}
