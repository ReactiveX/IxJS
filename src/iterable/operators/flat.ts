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

  private *_flatten(source: Iterable<TSource>, depth: number): Iterable<TSource> {
    if (depth === 0) {
      for (let item of source) {
        yield item;
      }
      return undefined;
    }
    for (let item of source) {
      if (isIterable(item)) {
        for (let innerItem of this._flatten(item, depth - 1)) {
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

export function flat<T>(depth: number = Infinity): MonoTypeOperatorFunction<T> {
  return function flattenOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new FlattenIterable<T>(source, depth);
  };
}
