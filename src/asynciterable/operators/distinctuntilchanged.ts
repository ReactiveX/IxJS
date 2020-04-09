import { AsyncIterableX } from '../asynciterablex';
import { identityAsync } from '../../util/identity';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { DistinctOptions } from './distinctoptions';

export class DistinctUntilChangedAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
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
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @template TKey The type of the discriminator key computed for each element in the source sequence.
 * @param {DistinctOptions<TSource, TKey>} [options] The optional options for adding a key selector and comparer.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns an async-iterable that contains only distinct contiguous items.
 */
export function distinctUntilChanged<TSource, TKey>(
  options?: DistinctOptions<TSource, TKey>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    const opts =
      options ||
      ({
        ['keySelector']: identityAsync,
        ['comparer']: comparerAsync,
      } as DistinctOptions<TSource, TKey>);
    const { ['keySelector']: keySelector, ['comparer']: comparer } = opts;
    return new DistinctUntilChangedAsyncIterable<TSource, TKey>(source, keySelector!, comparer!);
  };
}
