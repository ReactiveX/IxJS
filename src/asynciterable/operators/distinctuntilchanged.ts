import { AsyncIterableX } from '../asynciterablex';
import { identityAsync } from '../../util/identity';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from 'ix/util/aborterror';

export class DistinctUntilChangedAsyncIterable<TSource, TKey> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _keySelector: (value: TSource) => TKey | Promise<TKey>;
  private _comparer: (x: TKey, y: TKey) => boolean | Promise<boolean>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    keySelector: (value: TSource) => TKey | Promise<TKey>,
    comparer: (first: TKey, second: TKey) => boolean | Promise<boolean>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._keySelector = keySelector;
    this._comparer = comparer;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let currentKey: TKey | undefined;
    let hasCurrentKey = false;
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      const key = await this._keySelector(item);
      throwIfAborted(this._signal);

      let comparerEquals = false;
      if (hasCurrentKey) {
        comparerEquals = await this._comparer(currentKey!, key);
        throwIfAborted(this._signal);
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
  comparer: (first: TKey, second: TKey) => boolean | Promise<boolean> = comparerAsync,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function distinctUntilChangedOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new DistinctUntilChangedAsyncIterable<TSource, TKey>(
      source,
      keySelector,
      comparer,
      signal
    );
  };
}
