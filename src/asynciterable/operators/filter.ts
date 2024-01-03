import { AsyncIterableX } from '../asynciterablex.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

/** @ignore */
export class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;
  private _thisArg: any;

  constructor(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
    this._thisArg = thisArg;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let i = 0;
    for await (const item of wrapWithAbort(this._source, signal)) {
      if (await this._predicate.call(this._thisArg, item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): OperatorAsyncFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any
): OperatorAsyncFunction<T, T>;

/**
 * Filters the elements of an async-iterable sequence based on a predicate.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {((value: TSource, index: number, signal?: AbortSignal) => boolean | Promise<boolean>)} predicate A function to test each source element
 * for a condition.
 * @param {*} [thisArg] Optional this for binding.
 * @returns {OperatorAsyncFunction<TSource, TSource>} An operator which returns an async-iterable
 * sequence that contains elements from the input sequence that satisfy the condition.
 */
export function filter<TSource>(
  predicate: (value: TSource, index: number, signal?: AbortSignal) => boolean | Promise<boolean>,
  thisArg?: any
): OperatorAsyncFunction<TSource, TSource> {
  return function filterOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FilterAsyncIterable<TSource>(source, predicate, thisArg);
  };
}
