import { IterableX } from '../iterablex';
import { identity } from '../../util/identity';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class DistinctIterable<TSource, TKey> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _keySelector: (value: TSource) => TKey;
  private _cmp: (x: TKey, y: TKey) => boolean;

  constructor(
    source: Iterable<TSource>,
    keySelector: (value: TSource) => TKey,
    cmp: (x: TKey, y: TKey) => boolean
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._cmp = cmp;
  }

  *[Symbol.iterator]() {
    let set = [] as TKey[];

    for (let item of this._source) {
      let key = this._keySelector(item);
      if (arrayIndexOf(set, key, this._cmp) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

export function distinct<TSource, TKey>(
  keySelector: (value: TSource) => TKey = identity,
  comparer: (x: TKey, y: TKey) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function distinctOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new DistinctIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
