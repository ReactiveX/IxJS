import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export class OnErrorResumeNextAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for (const item of this._source) {
      const it = wrapWithAbort(item, signal)[Symbol.asyncIterator]();
      while (1) {
        let next;
        try {
          next = await it.next();
        } catch (e) {
          break;
        }

        if (next.done) {
          break;
        }
        yield next.value;
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
  return new OnErrorResumeNextAsyncIterable<T>(args);
}
