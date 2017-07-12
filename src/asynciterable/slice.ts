import { AsyncIterableX } from '../asynciterable';

class SliceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: AsyncIterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  async *[Symbol.asyncIterator]() {
    let it = this._source[Symbol.asyncIterator](), begin = this._begin, next;
    while (begin > 0 && !(next = await it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
        if (--end === 0) { break; }
      }
    }
  }
}

export function slice<TSource>(
    source: AsyncIterable<TSource>,
    begin: number,
    end: number = Infinity): AsyncIterableX<TSource> {
  return new SliceAsyncIterable<TSource>(source, begin, end);
}
