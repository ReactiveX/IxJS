import { AsyncIterableX } from '../asynciterable';

class SkipWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;

  constructor(
      source: AsyncIterable<TSource>,
      predicate: (value: TSource, index: number) => boolean | Promise<boolean>) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let yielding = false, i = 0;
    for await (let element of this._source) {
      if (!yielding && !(await this._predicate(element, i++))) { yielding = true; }
      if (yielding) { yield element; }
    }
  }
}

export function skipWhile<TSource>(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return new SkipWhileAsyncIterable<TSource>(source, predicate);
}
