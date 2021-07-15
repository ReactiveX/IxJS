import { IterableX } from '../iterablex';
import { isIterable } from '../../util/isiterable';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class FlattenIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _depth: number;

  constructor(source: Iterable<TSource>, depth: number) {
    super();
    this._source = source;
    this._depth = depth;
  }

  // eslint-disable-next-line consistent-return
  private *_flatten(source: Iterable<TSource>, depth: number): Iterable<TSource> {
    if (depth === 0) {
      for (const item of source) {
        yield item;
      }
      return undefined;
    }
    for (const item of source) {
      if (isIterable(item)) {
        for (const innerItem of this._flatten(item, depth - 1)) {
          yield innerItem;
        }
      } else {
        yield item;
      }
    }
  }

  [Symbol.iterator]() {
    return this._flatten(this._source, this._depth)[Symbol.iterator]();
  }
}

/**
 * Flattens the nested iterable by the given depth.
 *
 * @template T The type of elements in the source sequence.
 * @param {number} [depth=Infinity] The depth to flatten the iterable sequence if specified, otherwise infinite.
 * @returns {MonoTypeOperatorFunction<T>} An operator that flattens the iterable sequence.
 */
export function flat<T>(depth = Infinity): MonoTypeOperatorFunction<T> {
  return function flattenOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new FlattenIterable<T>(source, depth);
  };
}
