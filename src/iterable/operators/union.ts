import { IterableX } from '../iterablex';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class UnionIterable<TSource> extends IterableX<TSource> {
  private _left: Iterable<TSource>;
  private _right: Iterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean;

  constructor(
    left: Iterable<TSource>,
    right: Iterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean
  ) {
    super();
    this._left = left;
    this._right = right;
    this._comparer = comparer;
  }

  *[Symbol.iterator]() {
    let map = [] as TSource[];
    for (let lItem of this._left) {
      if (arrayIndexOf(map, lItem, this._comparer) === -1) {
        map.push(lItem);
        yield lItem;
      }
    }

    for (let rItem of this._right) {
      if (arrayIndexOf(map, rItem, this._comparer) === -1) {
        map.push(rItem);
        yield rItem;
      }
    }
  }
}

export function union<TSource>(
  right: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function unionOperatorFunction(left: Iterable<TSource>): IterableX<TSource> {
    return new UnionIterable<TSource>(left, right, comparer);
  };
}
