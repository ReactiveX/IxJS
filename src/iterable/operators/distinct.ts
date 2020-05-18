import { IterableX } from '../iterablex';
import { identity } from '../../util/identity';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';
import { DistinctOptions } from './distinctoptions';

export class DistinctIterable<TSource, TKey = TSource> extends IterableX<TSource> {
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
    const set = [] as TKey[];

    for (const item of this._source) {
      const key = this._keySelector(item);
      if (arrayIndexOf(set, key, this._cmp) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

/**
 * Returns an iterable sequence that contains only distinct elements according to the keySelector and comparer.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the discriminator key computed for each element in the source sequence.
 * @param {DistinctOptions<TSource, TKey>} [options] The optional arguments for a key selector and comparer function.
 * @returns {MonoTypeOperatorFunction<TSource>} An operator that returns distinct elements according to the keySelector and options.
 */
export function distinct<TSource, TKey = TSource>(
  options?: DistinctOptions<TSource, TKey>
): MonoTypeOperatorFunction<TSource> {
  return function distinctOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    const { ['keySelector']: keySelector = identity, ['comparer']: comparer = defaultComparer } =
      options || {};
    return new DistinctIterable<TSource, TKey>(source, keySelector!, comparer!);
  };
}
