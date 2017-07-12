import { IterableX } from '../iterable';

class SkipLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let q = [];
    for (let item of this._source) {
      q.push(item);
      if (q.length > this._count) {
        yield q.shift()!;
      }
    }
  }
}

export function skipLast<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new SkipLastIterable<TSource>(source, count);
}
