import { IterableX } from '../iterable';

class SkipIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let it = this._source[Symbol.iterator](), count = this._count, next;
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

export function skip<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new SkipIterable<TSource>(source, count);
}
