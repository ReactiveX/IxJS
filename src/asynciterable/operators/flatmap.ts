import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class FlatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (
    value: TSource,
    index: number,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
  private _thisArg?: any;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (
      value: TSource,
      index: number,
      signal?: AbortSignal
    ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._thisArg = thisArg;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const { _source: source, _selector: selector, _thisArg: thisArg } = this;
    let index = 0;
    for await (const outer of wrapWithAbort(source, signal)) {
      const inners = await selector.call(thisArg, outer, index++, signal);
      for await (const inner of wrapWithAbort(inners, signal)) {
        yield inner;
      }
    }
  }
}

/**
 * Projects each element of an async-iterable sequence to an async-iterable sequence and merges
 * the resulting async-iterable sequences into one async-iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of the elements in the projected inner sequences and the elements in the merged result sequence.
 * @param {((
 *     value: TSource,
 *     index: number,
 *     signal?: AbortSignal
 *   ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>)} selector A transform function to apply to each element.
 * @param {*} [thisArg] Option this for binding to the selector.
 * @returns {OperatorAsyncFunction<TSource, TResult>} An operator that creates an async-iterable sequence whose
 * elements are the result of invoking the one-to-many transform function on each element of the input sequence.
 */
export function flatMap<TSource, TResult>(
  selector: (
    value: TSource,
    index: number,
    signal?: AbortSignal
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new FlatMapAsyncIterable<TSource, TResult>(source, selector, thisArg);
  };
}
