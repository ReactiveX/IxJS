import { of } from './of';
import { IterableX } from '../iterable';

class RepeatIterable<TSource> extends IterableX<TSource> {
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
        for (let item of this._source) { yield item; }
      }
    } else {
      for (let i = 0; i < this._count; i++) {
        for (let item of this._source) { yield item; }
      }
    }
  }
}

export function repeat<TSource>(source: Iterable<TSource>, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(source, count);
}

export function repeatStatic<TSource>(value: TSource, count: number = -1): IterableX<TSource> {
  return new RepeatIterable<TSource>(of(value), count);
}
