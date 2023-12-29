import { IterableX } from '../iterablex';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
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
    const map = [] as TSource[];
    for (const secondItem of this._second) {
      map.push(secondItem);
    }

    for (const firstItem of this._first) {
      if (arrayIndexOf(map, firstItem, this._comparer) === -1) {
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

/**
 *  Produces the set difference of two iterable sequences by using the specified equality comparer to compare values.
 *
 * @template TSource The type of the elements of the input sequences.
 * @param {Iterable<TSource>} second An iterable sequence whose elements that also occur in the
 * operator sequence will cause those elements to be removed from the returned sequence.
 * @param {((x: TSource, y: TSource) => boolean} [comparer=defaultComparer] An equality comparer to compare values
 * @returns {MonoTypeOperatorFunction<TSource>} An operator that returns a sequence that contains the set
 * difference of the elements of two sequences.
 */
export function except<TSource>(
  second: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function exceptOperatorFunction(first: Iterable<TSource>): IterableX<TSource> {
    return new ExceptIterable<TSource>(first, second, comparer);
  };
}
