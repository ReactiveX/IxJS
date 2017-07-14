import { AsyncIterableX } from '../asynciterable';

class SkipUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator]() {
    let otherDone = false;
    this._other.then(() => otherDone = true);
    for await (let item of this._source) {
      if (otherDone) { yield item; }
    }
  }
}

export function skipUntil<TSource>(
    source: AsyncIterable<TSource>,
    other: Promise<any>): AsyncIterableX<TSource> {
  return new SkipUntilAsyncIterable<TSource>(source, other);
}
