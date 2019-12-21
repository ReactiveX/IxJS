import { IterableX } from '../iterablex';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class ExceptIterable<TSource> extends IterableX<TSource> {
  private _first: Iterable<TSource>;
  private _second: Iterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(
    first: Iterable<TSource>,
    second: Iterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean
  ) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  *[Symbol.iterator]() {
    let map = [] as TSource[];
    for (let secondItem of this._second) {
      map.push(secondItem);
    }

    for (let firstItem of this._first) {
      if (arrayIndexOf(map, firstItem, this._comparer) === -1) {
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

export function except<TSource>(
  second: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function exceptOperatorFunction(first: Iterable<TSource>): IterableX<TSource> {
    return new ExceptIterable<TSource>(first, second, comparer);
  };
}
