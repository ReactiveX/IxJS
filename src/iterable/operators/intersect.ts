import { IterableX } from '../iterablex';
import { arrayIndexOf } from '../../util/arrayindexof';
import { comparer as defaultComparer } from '../../util/comparer';
import { MonoTypeOperatorFunction } from '../../interfaces';

function arrayRemove<T>(array: T[], item: T, comparer: (x: T, y: T) => boolean): boolean {
  const idx = arrayIndexOf(array, item, comparer);
  if (idx === -1) {
    return false;
  }
  array.splice(idx, 1);
  return true;
}

/** @ignore */
export class IntersectIterable<TSource> extends IterableX<TSource> {
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
      if (arrayRemove(map, firstItem, this._comparer)) {
        yield firstItem;
      }
    }
  }
}

/**
 * Produces the set intersection of two iterable sequences.
 *
 * @template TSource The type of the elements of the input sequences.
 * @param {Iterable<TSource>} second An iterable sequence whose distinct elements that also
 * appear in the first sequence will be returned.
 * @param {((x: TSource, y: TSource) => boolean)} [comparer=defaultComparer] An equality comparer to compare values.
 * @returns {MonoTypeOperatorFunction<TSource>} An operator that returns a sequence that contains the elements that form the set
 * intersection of two sequences.
 */
export function intersect<TSource>(
  second: Iterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean = defaultComparer
): MonoTypeOperatorFunction<TSource> {
  return function intersectOperatorFunction(first: Iterable<TSource>): IterableX<TSource> {
    return new IntersectIterable<TSource>(first, second, comparer);
  };
}
