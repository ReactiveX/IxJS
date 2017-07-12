import { IterableX } from '../iterable';

class PairwiseIterable<TSource> extends IterableX<TSource[]> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let value: TSource | undefined, hasValue = false;
    for (const item of this._source) {
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
 * @param {Iterable<T>} source Source sequence.
 * @return {Iterable<T[]>} A sequence that triggers on successive pairs of iterations from the input sequence.
 */
export function pairwise<TSource>(source: Iterable<TSource>): IterableX<TSource[]> {
  return new PairwiseIterable<TSource>(source);
}
