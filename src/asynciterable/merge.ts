import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { safeRace } from '../util/safeRace';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

export class MergeAsyncIterable<T> extends AsyncIterableX<T> {
  private _source: AsyncIterable<T>[];

  constructor(source: AsyncIterable<T>[]) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal): AsyncIterator<T> {
    throwIfAborted(signal);
    const length = this._source.length;
    const iterators = new Array<AsyncIterator<T>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<T>>>>(length);
    let active = length;
    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort(this._source[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    while (active > 0) {
      const next = safeRace(nexts);
      const {
        value: { done: done$, value: value$ },
        index,
      } = await next;
      if (done$) {
        nexts[index] = <Promise<MergeResult<IteratorResult<T>>>>NEVER_PROMISE;
        active--;
      } else {
        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);
        yield value$;
      }
    }
  }
}

/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {AsyncIterable<T2>} v2 The second async-iterable source to merge.
 * @returns {(AsyncIterableX<T | T2>)} The merged elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 */
export function merge<T, T2>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>
): AsyncIterableX<T | T2>;
/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {AsyncIterable<T2>} v2 The second async-iterable source to merge.
 * @param {AsyncIterable<T3>} v3 The third async-iterable source to merge.
 * @returns {(AsyncIterableX<T | T2 | T3>)} The merged elements from all of the specified async-iterable sequences
 * into a single async-iterable sequence.
 */
export function merge<T, T2, T3>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {AsyncIterable<T2>} v2 The second async-iterable source to merge.
 * @param {AsyncIterable<T3>} v3 The third async-iterable source to merge.
 * @param {AsyncIterable<T4>} v4 The fourth async-iterable source to merge.
 * @returns {(AsyncIterableX<T | T2 | T3 | T4>)} The merged elements from all of the specified async-iterable sequences
 * into a single async-iterable sequence.
 */
export function merge<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {AsyncIterable<T2>} v2 The second async-iterable source to merge.
 * @param {AsyncIterable<T3>} v3 The third async-iterable source to merge.
 * @param {AsyncIterable<T4>} v4 The fourth async-iterable source to merge.
 * @param {AsyncIterable<T5>} v5 The fifth async-iterable source to merge.
 * @returns {(AsyncIterable<T | T2 | T3 | T4 | T5>)} The merged elements from all of the specified async-iterable sequences
 * into a single async-iterable sequence.
 */
export function merge<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the first async-iterable sequence.
 * @template T2 The type of the second async-iterable sequence.
 * @template T3 The type of the third async-iterable sequence.
 * @template T4 The type of the fourth async-iterable sequence.
 * @template T5 The type of the fifth async-iterable sequence.
 * @template T6 The type of the sixth async-iterable sequence.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {AsyncIterable<T2>} v2 The second async-iterable source to merge.
 * @param {AsyncIterable<T3>} v3 The third async-iterable source to merge.
 * @param {AsyncIterable<T4>} v4 The fourth async-iterable source to merge.
 * @param {AsyncIterable<T5>} v5 The fifth async-iterable source to merge.
 * @param {AsyncIterable<T6>} v6 The sixth async-iterable source to merge.
 * @returns {(AsyncIterable<T | T2 | T3 | T4 | T5 | T6>)} The merged elements from all of the specified async-iterable sequences
 * into a single async-iterable sequence.
 */
export function merge<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;
/**
 * Merges elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 *
 * @export
 * @template T The type of the elements in the sequence to merge.
 * @param {AsyncIterable<T>} source The first async-iterable source to merge.
 * @param {...AsyncIterable<T>[]} args The async-iterable sources to merge.
 * @returns {AsyncIterableX<T>} The merged elements from all of the specified async-iterable sequences into a single async-iterable sequence.
 */
export function merge<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T>;

export function merge<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new MergeAsyncIterable<T>([source, ...args]);
}
