import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class PairwiseAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    let value: TSource | undefined;
    let hasValue = false;
    for await (const item of wrapWithAbort(this._source, signal)) {
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
