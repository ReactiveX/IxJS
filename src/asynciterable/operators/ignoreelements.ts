import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export class IgnoreElementsAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<TSource> {
    // eslint-disable-next-line no-empty
    for await (const _ of this._source) {
    }
  }
}

export function ignoreElements<TSource>(): MonoTypeOperatorAsyncFunction<TSource> {
  return function ignoreElementsOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new IgnoreElementsAsyncIterable<TSource>(source);
  };
}
