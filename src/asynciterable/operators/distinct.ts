import { AsyncIterableX } from './../asynciterablex';
import { identityAsync } from '../../util/identity';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { DistinctOptions } from './distinctoptions';

export class DistinctAsyncIterable<TSource, TKey = TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
    comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const set = [] as TKey[];

    for await (const item of wrapWithAbort(this._source, signal)) {
      const key = await this._keySelector(item, signal);
      if ((await arrayIndexOfAsync(set, key, this._comparer)) === -1) {
        set.push(key);
        yield item;
      }
    }
  }
}

/**
 * Returns an async-iterable sequence that contains only distinct elements according to the keySelector and comparer.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the discriminator key computed for each element in the source sequence.
 * @param {DistinctOptions<TSource, TKey = TSource>} [options] The optional arguments for a key selector and comparer function.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns distinct elements according to the keySelector and options.
 */
export function distinct<TSource, TKey = TSource>(
  options?: DistinctOptions<TSource, TKey>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    const { ['keySelector']: keySelector = identityAsync, ['comparer']: comparer = comparerAsync } =
      options || {};
    return new DistinctAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
