import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class SkipUntilAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _other: () => Promise<any>;

  constructor(source: AsyncIterable<TSource>, other: () => Promise<any>) {
    super();
    this._source = source;
    this._other = other;
  }

  async *[Symbol.asyncIterator]() {
    let otherDone = false;
    this._other().then(() => (otherDone = true));
    for await (const item of this._source) {
      if (otherDone) {
        yield item;
      }
    }
  }
}

export function skipUntil<TSource>(
  other: () => Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function skipUntilOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new SkipUntilAsyncIterable<TSource>(source, other);
  };
}
