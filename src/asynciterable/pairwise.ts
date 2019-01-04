import { AsyncIterableX } from './asynciterablex';
import { OperatorAsyncFunction } from '../interfaces';

export class PairwiseAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let value: TSource | undefined,
      hasValue = false;
    for await (const item of this._source) {
      if (!hasValue) {
        hasValue = true;
      } else {
        yield [value!, item];
      }
      value = item;
    }
  }
}

export function pairwise<TSource>(): OperatorAsyncFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new PairwiseAsyncIterable<TSource>(source);
  };
}
