import { AsyncIterableX } from './asynciterablex';
import { returnAsyncIterator } from '../util/returniterator';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';

export class CatchAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    let error = null;
    let hasError = false;

    for (const source of this._source) {
      const it = wrapWithAbort(source, signal)[Symbol.asyncIterator]();

      error = null;
      hasError = false;

      while (1) {
        let c = <TSource>{};

        try {
          const { done, value } = await it.next();
          if (done) {
            await returnAsyncIterator(it);
            break;
          }
          c = value;
        } catch (e) {
          error = e;
          hasError = true;
          await returnAsyncIterator(it);
          break;
        }

        yield c;
      }

      if (!hasError) {
        break;
      }
    }

    if (hasError) {
      throw error;
    }
  }
}

/**
 * Continues an async-iterable sequence that is terminated by an exception with the next async-iterable sequence.
 *
 * @template T The type of the elements in the source and handler sequences.
 * @param {Iterable<AsyncIterable<T>>} source async-iterable sequences to catch exceptions for.
 * @returns {AsyncIterableX<T>} An async-iterable sequence containing elements from consecutive source
 * sequences until a source sequence terminates successfully.
 */
export function catchAll<T>(source: Iterable<AsyncIterable<T>>): AsyncIterableX<T> {
  return new CatchAllAsyncIterable<T>(source);
}

/**
 * Continues an async-iterable sequence that is terminated by an exception with the next async-iterable sequence.
 *
 * @template T The type of the elements in the source and handler sequences.
 * @param {...AsyncIterable<T>[]} args async-iterable sequences to catch exceptions for.
 * @returns {AsyncIterableX<T>} An async-iterable sequence containing elements from consecutive source
 * sequences until a source sequence terminates successfully.
 */
export function catchError<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new CatchAllAsyncIterable<T>(args);
}
