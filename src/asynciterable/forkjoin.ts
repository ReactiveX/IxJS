import { identity, identityAsync } from '../util/identity';
import { wrapWithAbort } from './operators/withabort';
import { CombineOptions } from './combineoptions';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

export interface ForkJoinOptions<T, R> extends CombineOptions<T, R> {
  signal?: AbortSignal;
}

/**
 * Runs all specified async-iterable sequences in parallel and collects their last elements.
 *
 * @export
 * @template T The type of the elements in the source sequences.
 * @template R The type of the elements in the result sequence, returned by the selector function.
 * @param {AsyncIterable<T>[]} sources Async-iterable sequence to collect the last elements for.
 * @param {ForkJoinOptions<T, R>} options The options for forkJoin such as a selector, thisArg and abort signal for cancellation.
 * @returns {(Promise<R | undefined>)} An async-iterable sequence with the result of calling the selector function with
 * the last elements of both input sequences.
 */
export async function forkJoin<T, R>(
  sources: AsyncIterable<T>[],
  options: ForkJoinOptions<T, R>
): Promise<R | undefined> {
  const opts = options || ({ selector: identityAsync } as ForkJoinOptions<T, R>);
  const { selector, thisArg, signal } = opts;
  const length = sources.length;
  const iterators = new Array<AsyncIterator<T>>(length);
  const nexts = new Array<Promise<MergeResult<IteratorResult<T>>>>(length);

  let active = length;
  const values = new Array<T>(length);
  const hasValues = new Array<boolean>(length);
  hasValues.fill(false);

  for (let i = 0; i < length; i++) {
    const iterator = wrapWithAbort(sources[i], signal)[Symbol.asyncIterator]();
    iterators[i] = iterator;
    nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
  }

  while (active > 0) {
    const next = Promise.race(nexts);
    const { value: next$, index } = await next;
    if (next$.done) {
      nexts[index] = <Promise<MergeResult<IteratorResult<T>>>>NEVER_PROMISE;
      active--;
    } else {
      const iterator$ = iterators[index];
      nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);
      hasValues[index] = true;
      values[index] = next$.value;
    }
  }

  if (hasValues.length > 0 && hasValues.every(identity)) {
    return await selector!.call(thisArg, values, signal);
  }

  return undefined;
}
