import { AsyncIterableX } from './asynciterablex';

export interface TimeInterval<T> {
  value: T;
  elapsed: number;
}

export class TimeIntervalAsyncIterable<TSource> extends AsyncIterableX<TimeInterval<TSource>> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let last = Date.now();
    for await (let item of this._source) {
      const now = Date.now();
      const span = now - last;
      last = now;
      yield { value: item, elapsed: span };
    }
  }
}

export function timeInterval<TSource>(
  source: AsyncIterable<TSource>
): AsyncIterableX<TimeInterval<TSource>> {
  return new TimeIntervalAsyncIterable<TSource>(source);
}
