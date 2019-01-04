import { AsyncIterableX } from './asynciterablex';
import { arrayIndexOfAsync } from '../util/arrayindexof';
import { comparerAsync } from '../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';

async function arrayRemove<T>(
  array: T[],
  item: T,
  comparer: (x: T, y: T) => boolean | Promise<boolean>
): Promise<boolean> {
  let idx = await arrayIndexOfAsync(array, item, comparer);
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

  async *[Symbol.asyncIterator]() {
    let map = [] as TSource[];
    for await (let secondItem of this._second) {
      map.push(secondItem);
    }

    for await (let firstItem of this._first) {
      if (await arrayRemove(map, firstItem, this._comparer)) {
        yield firstItem;
      }
    }
  }
}

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
