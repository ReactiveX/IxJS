import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

async function arrayRemove<T>(
  array: T[],
  item: T,
  comparer: (x: T, y: T) => boolean | Promise<boolean>,
  signal?: AbortSignal
): Promise<boolean> {
  throwIfAborted(signal);
  const idx = await arrayIndexOfAsync(array, item, comparer);
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

  constructor(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>
  ) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const map = [] as TSource[];
    for await (const secondItem of wrapWithAbort(this._second, signal)) {
      map.push(secondItem);
    }

    for await (const firstItem of wrapWithAbort(this._first, signal)) {
      if (await arrayRemove(map, firstItem, this._comparer, signal)) {
        yield firstItem;
      }
    }
  }
}

/**
 * Produces the set intersection of two async-iterable sequences.
 *
 * @export
 * @template TSource The type of the elements of the input sequences.
 * @param {AsyncIterable<TSource>} second An async-iterable sequence whose distinct elements that also
 * appear in the first sequence will be returned.
 * @param {((x: TSource, y: TSource) => boolean | Promise<boolean>)} [comparer=comparerAsync] An equality comparer to compare values.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An operator that returns a sequence that contains the elements that form the set
 * intersection of two sequences.
 */
export function intersect<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function intersectOperatorFunction(
    first: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IntersectAsyncIterable<TSource>(first, second, comparer);
  };
}
