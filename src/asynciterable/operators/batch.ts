import { AsyncIterableX } from '../asynciterablex.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';

interface AsyncResolver<T> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

/** @ignore */
export class BatchAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    super();
    this._source = source;
  }

  [Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<TSource[]> {
    throwIfAborted(signal);

    let waitingResolver: AsyncResolver<TSource[] | null> | null = null;
    let batch: TSource[] = [];
    let it: AsyncIterator<TSource> | undefined;

    let sourceError: any;
    let sourceDone = false;

    const run = async () => {
      it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();

      try {
        for await (const item of {
          [Symbol.asyncIterator]: () => it!,
        }) {
          if (waitingResolver) {
            waitingResolver.resolve([item]);
            waitingResolver = null;
          } else {
            batch.push(item);
          }
        }

        sourceDone = true;
        waitingResolver?.resolve(null);
      } catch (e) {
        sourceError = e;
        waitingResolver?.reject(e);
      }
    };

    run();

    return {
      async next() {
        if (batch.length) {
          const value = batch;
          batch = [];
          return { value, done: false };
        }

        if (sourceError) {
          throw sourceError;
        }

        if (sourceDone) {
          return { done: true, value: undefined };
        }

        // There were no queued items, so we need to wait
        const value = await new Promise<TSource[] | null>((resolve, reject) => {
          waitingResolver = { resolve, reject };
        });

        if (value) {
          return { done: false, value };
        } else {
          return { done: true, value: undefined };
        }
      },
      async return(): Promise<IteratorResult<TSource[]>> {
        await it?.return?.();

        return { done: true, value: undefined };
      },
    };
  }
}

/**
 * Returns an async iterable sequence of batches that are collected from the source sequence between
 * subsequent `next()` calls.
 *
 * @template TSource The type of elements in the source sequence.
 * @returns {OperatorAsyncFunction<TSource, TSource[]>} An operator returning an async-iterable of batches that are collection from the
 * source sequence between subsequent `next()` calls.
 */
export function batch<TSource>(): OperatorAsyncFunction<TSource, TSource[]> {
  return function batchOperator(source) {
    return new BatchAsyncIterable(source);
  };
}
