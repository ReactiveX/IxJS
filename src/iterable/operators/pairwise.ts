import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

export class PairwiseIterable<TSource> extends IterableX<TSource[]> {
  private _source: Iterable<TSource>;

  constructor(source: Iterable<TSource>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let value: TSource | undefined;
    let hasValue = false;
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
 * Returns a sequence of each element in the input sequence and its predecessor, with the exception of the
 * first element which is only returned as the predecessor of the second element.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @returns {OperatorFunction<TSource, TSource[]>} The result sequence.
 */
export function pairwise<TSource>(): OperatorFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(source: Iterable<TSource>): IterableX<TSource[]> {
    return new PairwiseIterable<TSource>(source);
  };
}
