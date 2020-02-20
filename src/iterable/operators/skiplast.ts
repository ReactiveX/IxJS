import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class SkipLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    const q = [] as TSource[];
    for (const item of this._source) {
      q.push(item);
      if (q.length > this._count) {
        yield q.shift()!;
      }
    }
  }
}

export function skipLast<TSource>(count: number): MonoTypeOperatorFunction<TSource> {
  return function skipLastOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new SkipLastIterable<TSource>(source, count);
  };
}
