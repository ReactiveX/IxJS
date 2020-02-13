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

export function pairwise<TSource>(): OperatorFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(source: Iterable<TSource>): IterableX<TSource[]> {
    return new PairwiseIterable<TSource>(source);
  };
}
