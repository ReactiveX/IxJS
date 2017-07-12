import { AsyncIterableX } from '../asynciterable';
import { arrayIndexOfAsync } from '../internal/arrayindexof';
import { comparerAsync } from '../internal/comparer';

class ExceptAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _first: AsyncIterable<TSource>;
  private _second: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>;

  constructor(
      first: AsyncIterable<TSource>,
      second: AsyncIterable<TSource>,
      comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator]() {
    let map = [];
    for await (let secondItem of this._second) {
      map.push(secondItem);
    }

    for await (let firstItem of this._first) {
      if (await arrayIndexOfAsync(map, firstItem, this._comparer) === -1) {
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

export function except<TSource>(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync): AsyncIterableX<TSource> {
  return new ExceptAsyncIterable<TSource>(first, second, comparer);
}
