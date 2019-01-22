import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class RepeatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count === -1) {
      while (1) {
        for (let item of this._source) {
          yield item;
        }
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        for (let item of this._source) {
          yield item;
        }
      }
    }
  }
}

export function repeat<TSource>(count: number = -1): MonoTypeOperatorFunction<TSource> {
  return function repeatOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new RepeatIterable<TSource>(source, count);
  };
}
