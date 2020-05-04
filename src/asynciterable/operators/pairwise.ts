import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class PairwiseAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
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

/**
 * Returns a sequence of each element in the input sequence and its predecessor, with the exception of the
 * first element which is only returned as the predecessor of the second element.
 *
 * @export
 * @template TSource The type of the elements in the source sequence.
 * @returns {OperatorAsyncFunction<TSource, TSource[]>} The result sequence.
 */
export function pairwise<TSource>(): OperatorAsyncFunction<TSource, TSource[]> {
  return function pairwiseOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource[]> {
    return new PairwiseAsyncIterable<TSource>(source);
  };
}
