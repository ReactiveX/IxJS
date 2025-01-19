import { AsyncIterableX } from './asynciterablex.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';

/** @ignore */
export class OnErrorResumeNextAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    for (const outer of this._source) {
      try {
        for await (const item of wrapWithAbort(outer, signal)) {
          yield item;
        }
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Concatenates all of the specified async-iterable sequences, even if the previous async-iterable sequence terminated exceptionally.
 *
 * @template T The type of the elements in the source sequences.
 * @param {...AsyncIterable<T>[]} args Async-iterable sequences to concatenate.
 * @returns {AsyncIterableX<T>} An async-iterable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
 */
export function onErrorResumeNext<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new OnErrorResumeNextAsyncIterable(args);
}
