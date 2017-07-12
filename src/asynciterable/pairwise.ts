import { AsyncIterableX } from '../asynciterable';

class PairwiseAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let value: TSource | undefined, hasValue = false;
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

/**
 * Returns a new sequence that triggers on the second and subsequent triggerings of the input sequence.
 * @param {AsyncIterable<T>} source Source sequence.
 * @return {AsyncIterable<T[]>} A sequence that triggers on successive pairs of iterations from the input sequence.
 */
export function pairwise<TSource>(source: AsyncIterable<TSource>): AsyncIterableX<TSource[]> {
  return new PairwiseAsyncIterable<TSource>(source);
}
