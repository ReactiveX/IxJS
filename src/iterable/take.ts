import { IterableX } from '../iterable';

class TakeIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = this._count;
    if (i > 0) {
      for (let item of this._source) {
        yield item;
        if (--i === 0) { break; }
      }
    }
  }
}

export function take<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new TakeIterable<TSource>(source, count);
}
