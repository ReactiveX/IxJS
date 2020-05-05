import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';
import { identity } from '../../util/identity';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

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

    const length = this._others.length;
    const newLength = length + 1;
    const iterators = new Array<AsyncIterator<TSource>>(newLength);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(newLength);

    let hasValueAll = false;
    const hasValue = new Array(length);
    const values = new Array(length);
    hasValue.fill(false);

    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort(this._others[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    const it = wrapWithAbort(this._source, signal)[Symbol.asyncIterator]();
    iterators[length] = it;
    nexts[length] = wrapPromiseWithIndex(it.next(), length);

    for (;;) {
      const next = Promise.race(nexts);
      const {
        value: { value: value$, done: done$ },
        index,
      } = await next;

      if (index === length) {
        if (done$) {
          break;
        }

        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);

        if (hasValueAll) {
          yield [value$, ...values];
        }
      } else if (done$) {
        nexts[index] = <Promise<MergeResult<IteratorResult<TSource>>>>NEVER_PROMISE;
      } else {
        values[index] = value$;
        hasValue[index] = true;
        hasValueAll = hasValue.every(identity);

        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);
      }
    }
  }
}

/**
 * Merges multiple async-iterable sequences into one async-iterable sequence by combining each element
 * from the first source with the latest element from the other sources, if any.
 *
 * @export
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
 * @export
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
 * @export
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
 * @export
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
 * @export
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
 * @export
 * @template T The type of the elements in the source sequences.
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @returns {OperatorAsyncFunction<T, T[]>} An async-iterable sequence containing the result of combining
 * each element of the first source with the latest element from the second source, if any as an array.
 */
export function withLatestFrom<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;

export function withLatestFrom<T>(...sources: any[]): OperatorAsyncFunction<T, T[]> {
  return function withLatestFromOperatorFunction(source: AsyncIterable<T>) {
    return new WithLatestFromAsyncIterable<T>(source, sources);
  };
}
