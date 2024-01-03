import { AsyncIterableX } from '../asynciterablex.js';
import { identityAsync } from '../../util/identity.js';
import { comparerAsync } from '../../util/comparer.js';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';
import { DistinctOptions } from './distinctoptions.js';

/** @ignore */
export class DistinctUntilChangedAsyncIterable<TSource, TKey = TSource> extends AsyncIterableX<
  TSource
> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource, signal?: AbortSignal) => TKey | Promise<TKey>,
    comparer: (first: TKey, second: TKey) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let currentKey: TKey | undefined;
    let hasCurrentKey = false;
    for await (const item of wrapWithAbort(this._source, signal)) {
      const key = await this._keySelector(item, signal);
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

/**
 * Returns an async-iterable sequence that contains only distinct contiguous elements according to the optional keySelector and comparer.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the discriminator key computed for each element in the source sequence.
 * @param {DistinctOptions<TSource, TKey = TSource>} [options] The optional options for adding a key selector and comparer.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns an async-iterable that contains only distinct contiguous items.
 */
export function distinctUntilChanged<TSource, TKey = TSource>(
  options?: DistinctOptions<TSource, TKey>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    const { ['keySelector']: keySelector = identityAsync, ['comparer']: comparer = comparerAsync } =
      options || {};
    return new DistinctUntilChangedAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
