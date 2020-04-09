import { AsyncIterableX } from './asynciterablex';
import { identity, identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { CombineOptions } from './combineoptions';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

export class CombineLatestAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
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

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const { _fn: fn, _thisArg: thisArg } = this;
    const length = this._sources.length;
    const iterators = new Array<AsyncIterator<TSource>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(length);
    let hasValueAll = false;
    const values = new Array<TSource>(length);
    const hasValues = new Array<boolean>(length);
    let active = length;

    hasValues.fill(false);

    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort(this._sources[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    while (active > 0) {
      const next = Promise.race(nexts);
      const {
        value: { value: value$, done: done$ },
        index,
      } = await next;
      if (done$) {
        nexts[index] = <Promise<MergeResult<IteratorResult<TSource>>>>NEVER_PROMISE;
        active--;
      } else {
        values[index] = value$;
        hasValues[index] = true;

        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);

        if (hasValueAll || (hasValueAll = hasValues.every(identity))) {
          yield await fn.call(thisArg, values, signal);
        }
      }
    }
  }
}

/**
 * Merges the specified async-iterable sequences into one async-iterable sequence by using the
 * selector function whenever any of the observable sequences produces an element.
 *
 * @export
 * @template T The type of the elements in the source sequences.
 * @template R The type of the elements in the result sequence, returned by the selector function.
 * @param {...any[]} sources The input sequences.
 * @returns {AsyncIterableX<R>} An async-iterable sequence containing the result of combining elements of the sources using
 * the specified result selector function.
 */
export function combineLatest<T, R>(
  sources: AsyncIterable<T>[],
  options?: CombineOptions<T, R>
): AsyncIterableX<R> {
  const opts = options || ({ ['selector']: identityAsync } as CombineOptions<T, R>);
  const { ['selector']: selector, ['thisArg']: thisArg } = opts;
  return new CombineLatestAsyncIterable<T, R>(sources, selector!, thisArg);
}
