import { wrapWithAbort } from './operators/withabort';
import { AsyncIterableX } from './asynciterablex';
import { identityAsync } from '../util/identity';
import { returnAsyncIterator } from '../util/returniterator';
import { throwIfAborted } from '../aborterror';
import { CombineOptions } from './combineoptions';

export class ZipAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _sources: AsyncIterable<TSource>[];
  private _fn: (values: any[], signal?: AbortSignal) => TResult | Promise<TResult>;
  private _thisArg?: any;

  constructor(
    sources: AsyncIterable<TSource>[],
    fn: (values: any[], signal?: AbortSignal) => TResult | Promise<TResult>,
    thisArg?: any
  ) {
    super();
    this._sources = sources;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  // eslint-disable-next-line consistent-return
  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterableIterator<TResult> {
    throwIfAborted(signal);
    const { _fn: fn, _thisArg: thisArg } = this;
    const sourcesLength = this._sources.length;
    const its = this._sources.map((x) => wrapWithAbort(x, signal)[Symbol.asyncIterator]());
    while (sourcesLength > 0) {
      const values = new Array(sourcesLength);
      for (let i = -1; ++i < sourcesLength; ) {
        const { value, done } = await its[i].next();
        if (done) {
          await Promise.all(its.map(returnAsyncIterator));
          return undefined;
        }
        values[i] = value;
      }
      yield await fn.call(thisArg, values, signal);
    }
  }
}

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining their elements in a pairwise fashion.
 *
 * @export
 * @template T The type of the elements in the source sequences.
 * @template R The type of the elements in the result sequence, returned by the selector function.
 * @param {AsyncIterable<T>[]} sources The async-iterable sources.
 * @param {CombineOptions<T, R>} [options] The options to include a selector, and thisArg for binding.
 * @returns {AsyncIterableX<R>} An async-enumerable sequence containing the pairwise combining of the elements from the async-iterable sources.
 */
export function zip<T, R>(
  sources: AsyncIterable<T>[],
  options?: CombineOptions<T, R>
): AsyncIterableX<R> {
  const opts = options || ({ ['selector']: identityAsync } as CombineOptions<T, R>);
  const { ['selector']: selector, ['thisArg']: thisArg } = opts;
  return new ZipAsyncIterable<T, R>(sources as AsyncIterable<T>[], selector!, thisArg);
}
