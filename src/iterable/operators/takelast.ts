import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class TakeLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count > 0) {
      let q = [] as TSource[];
      for (let item of this._source) {
        if (q.length >= this._count) {
          q.shift();
        }
        q.push(item);
      }

      while (q.length > 0) {
        yield q.shift()!;
      }
    }
  }
}

export function takeLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function takeLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TakeLastIterable<TSource>(source, count);
  };
}
