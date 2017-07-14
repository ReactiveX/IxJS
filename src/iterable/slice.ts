import { IterableX } from '../iterable';

class SliceIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: Iterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  *[Symbol.iterator]() {
    let it = this._source[Symbol.iterator](), begin = this._begin, next;
    while (begin > 0 && !(next = it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = it.next()).done) {
        yield next.value;
        if (--end === 0) { break; }
      }
    }
  }
}

export function slice<TSource>(
    source: Iterable<TSource>,
    begin: number,
    end: number = Infinity): IterableX<TSource> {
  return new SliceIterable<TSource>(source, begin, end);
}
