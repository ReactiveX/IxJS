import { IterableX } from '../iterable';
import { arrayIndexOf } from '../internal/arrayindexof';
import { comparer as defaultComparer } from '../internal/comparer';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  let idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) { return false; }
  array.splice(idx, 1);
  return true;
}

class IntersectIterable<TSource> extends IterableX<TSource> {
  private _first: Iterable<TSource>;
  private _second: Iterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(
      first: Iterable<TSource>,
      second: Iterable<TSource>,
      comparer: (x: TSource, y: TSource) => boolean) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  *[Symbol.iterator]() {
    let map = [];
    for (let secondItem of this._second) {
      map.push(secondItem);
    }

    for (let firstItem of this._first) {
      if (arrayRemove(map, firstItem, this._comparer)) {
        yield firstItem;
      }
    }
  }
}

export function intersect<TSource>(
      first: Iterable<TSource>,
      second: Iterable<TSource>,
      comparer: (x: TSource, y: TSource) => boolean = defaultComparer): IterableX<TSource> {
  return new IntersectIterable<TSource>(first, second, comparer);
}
