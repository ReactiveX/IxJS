import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class SkipIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    const it = this._source[Symbol.iterator]();
    let count = this._count;
    let next;
    while (count > 0 && !(next = it.next()).done) {
      count--;
    }
    if (count <= 0) {
      while (!(next = it.next()).done) {
        yield next.value;
      }
    }
  }
}

export function skip<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function skipOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SkipIterable<TSource>(source, count);
  };
}
