import { AsyncIterableX } from '../asynciterable';

export interface Timestamp<TSource> {
  time: number;
  value: TSource;
}

class TimestampAsyncIterable<TSource> extends AsyncIterableX<Timestamp<TSource>> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    for await (const item of this._source) {
      yield { time: Date.now(), value: item };
    }
  }
}

export function timestamp<TSource>(
    source: AsyncIterable<TSource>): AsyncIterableX<Timestamp<TSource>> {
  return new TimestampAsyncIterable<TSource>(source);
}
