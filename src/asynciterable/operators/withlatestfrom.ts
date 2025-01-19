import { AsyncIterableX } from '../asynciterablex.js';
import { OperatorAsyncFunction } from '../../interfaces.js';
import { wrapWithAbort } from './withabort.js';
import { throwIfAborted } from '../../aborterror.js';
import { identity } from '../../util/identity.js';
import { safeRace } from '../../util/safeRace.js';
import { returnAsyncIterators } from '../../util/returniterator.js';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise<never>(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

/** @ignore */
export class WithLatestFromAsyncIterable<TSource> extends AsyncIterableX<TSource[]> {
  private _source: AsyncIterable<TSource>;
  private _others: AsyncIterable<TSource>[];

  constructor(source: AsyncIterable<TSource>, others: AsyncIterable<TSource>[]) {
    super();
    this._source = source;
    this._others = others;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);

    const othersLength = this._others.length;
    // The last iterator is the source
    const iterators = new Array<AsyncIterator<TSource>>(othersLength + 1);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(othersLength + 1);

    let hasValueAll = false;
    const values = new Array(othersLength);
    const hasValue = new Array(othersLength).fill(false);

    for (let i = 0; i < othersLength; i++) {
      const iterator = wrapWithAbort(this._others[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    const it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();
    iterators[othersLength] = it;
    nexts[othersLength] = wrapPromiseWithIndex(it.next(), othersLength);

    try {
      while (1) {
        const {
          value: { value, done },
          index,
        } = await safeRace(nexts);

        if (index === othersLength) {
          if (done) {
            break;
          }

          nexts[index] = wrapPromiseWithIndex(iterators[index].next(), index);

          if (hasValueAll) {
            yield [value, ...values];
          }
        } else {
          if (done) {
            nexts[index] = NEVER_PROMISE;
          } else {
            values[index] = value;
            hasValue[index] = true;
            hasValueAll = hasValueAll || hasValue.every(identity);

            nexts[index] = wrapPromiseWithIndex(iterators[index].next(), index);
          }
        }
      }
    } finally {
      await returnAsyncIterators(iterators);
    }
  }
}

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T, T2>(
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, [T, T2]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T, T2, T3>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, [T, T2, T3]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T, T2, T3, T4>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, [T, T2, T3, T4]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T, T2, T3, T4, T5>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the first source sequence.
 * @template T2 The type of the elements in the second source sequence.
 * @template T3 The type of the elements in the third source sequence.
 * @template T4 The type of the elements in the fourth source sequence.
 * @template T5 The type of the elements in the fifth source sequence.
 * @template T6 The type of the elements in the sixth source sequence.
 * @param {AsyncIterable<T2>} source2 Second async-iterable source.
 * @param {AsyncIterable<T3>} source3 Third async-iterable source.
 * @param {AsyncIterable<T4>} source4 Fourth async-iterable source.
 * @param {AsyncIterable<T5>} source5 Fifth async-iterable source.
 * @param {AsyncIterable<T6>} source6 Sixth async-iterable source.
 * @returns {OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T, T2, T3, T4, T5, T6>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>;

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @template T The type of the elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @returns {OperatorAsyncFunction<T, T[]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;

export function withLatestFrom<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]> {
  return function withLatestFromOperatorFunction(source) {
    return new WithLatestFromAsyncIterable(source, sources);
  };
}
