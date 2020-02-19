import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexofasync';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AbortError } from 'ix/util/aborterror';
import { wrapWithAbort } from './withabort';

async function arrayRemove<T>(
  array: T[],
  item: T,
  comparer: (x: T, y: T) => boolean | Promise<boolean>,
  signal?: AbortSignal
): Promise<boolean> {
  const idx = await arrayIndexOfAsync(array, item, comparer, signal);
  if (signal?.aborted) {
    throw new AbortError();
  }
  if (idx === -1) {
    return false;
  }
  array.splice(idx, 1);
  return true;
}

export class IntersectAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _first: AsyncIterable<TSource>;
  private _second: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>;
  private _signal?: AbortSignal;

  constructor(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>,
    signal?: AbortSignal
  ) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const map = [] as TSource[];
    for await (const secondItem of wrapWithAbort(this._second, this._signal)) {
      map.push(secondItem);
    }

    for await (const firstItem of wrapWithAbort(this._first, this._signal)) {
      const removed = await arrayRemove(map, firstItem, this._comparer, this._signal);
      if (this._signal?.aborted) {
        throw new AbortError();
      }
      if (removed) {
        yield firstItem;
      }
    }
  }
}

export function intersect<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function intersectOperatorFunction(
    first: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IntersectAsyncIterable<TSource>(first, second, comparer, signal);
  };
}
