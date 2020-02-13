import { AsyncIterableX } from './../asynciterablex';
import { identityAsync } from '../../util/identity';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { AbortError } from 'ix/util/aborterror';

export class DistinctAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const set = [] as TKey[];

    for await (const item of wrapWithAbort(this._source, this._signal)) {
      const key = await this._keySelector(item);
      if (this._signal?.aborted) {
        throw new AbortError();
      }

      if ((await arrayIndexOfAsync(set, key, this._comparer)) === -1) {
        if (this._signal?.aborted) {
          throw new AbortError();
        }

        set.push(key);
        yield item;
      }
    }
  }
}

export function distinct<TSource, TKey>(
  keySelector: (value: TSource) => TKey | Promise<TKey> = identityAsync,
  comparer: (x: TKey, y: TKey) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DistinctAsyncIterable<TSource, TKey>(source, keySelector, comparer);
  };
}
