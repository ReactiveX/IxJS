import { AsyncIterableX } from './asynciterablex.js';
import { identity } from '../util/identity.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { safeRace } from '../util/safeRace.js';
import { returnAsyncIterators } from '../util/returniterator.js';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise<never>(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

/** @ignore */
export class CombineLatestAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _sources: AsyncIterable<TSource>[];

  constructor(sources: AsyncIterable<TSource>[]) {
    super();
    this._sources = sources;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const length = this._sources.length;
    const iterators = new Array<AsyncIterator<TSource>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(length);

    let active = length;
    let allValuesAvailable = false;
    const values = new Array<TSource>(length);
    const hasValues = new Array<boolean>(length).fill(false);

    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort(this._sources[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    try {
      while (active > 0) {
        const {
          value: { value, done },
          index,
        } = await safeRace(nexts);

        if (done) {
          nexts[index] = NEVER_PROMISE;
          active--;
        } else {
          values[index] = value;
          hasValues[index] = true;
          allValuesAvailable = allValuesAvailable || hasValues.every(identity);

          nexts[index] = wrapPromiseWithIndex(iterators[index].next(), index);

          if (allValuesAvailable) {
            yield values;
          }
        }
      }
    } finally {
      await returnAsyncIterators(iterators);
    }
  }
}

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @returns {AsyncIterableX<[T, T2]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T, T2, T3>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4, T5]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @template T6 The type of the elements in the sixth source sequence.
 * @param {AsyncIterable<T>} source First async-iterable source.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @param {AsyncIterable<T6>} source6 Sixth async-iterable source.
 * @returns {AsyncIterableX<[T, T2, T3, T4, T5, T6]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence as an array whenever
 * one of the async-iterable sequences produces an element.
 *
 * @template T The of the elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The async-iterable sources.
 * @returns {AsyncIterableX<T[]>} An async-iterable sequence containing an array of all sources.
 */
export function combineLatest<T>(...sources: AsyncIterable<T>[]): AsyncIterableX<T[]>;
export function combineLatest<T>(...sources: any[]): AsyncIterableX<T[]> {
  return new CombineLatestAsyncIterable(sources);
}
