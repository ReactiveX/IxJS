import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';
import { throwIfAborted } from '../aborterror';
import { safeRace } from '../util/safeRace';

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

export class RaceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _sources: AsyncIterable<TSource>[];

  constructor(sources: AsyncIterable<TSource>[]) {
    super();
    this._sources = sources;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const sources = this._sources;
    const length = sources.length;

    const iterators = new Array<AsyncIterator<TSource>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<TSource>>>>(length);

    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort<TSource>(sources[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    const next = safeRace(nexts);
    const { value: next$, index } = await next;

    if (!next$.done) {
      yield next$.value;
    }

    const iterator$ = iterators[index];

    // Cancel/finish other iterators
    for (let i = 0; i < length; i++) {
      if (i === index) {
        continue;
      }

      const otherIterator = iterators[i];
      if (otherIterator.return) {
        otherIterator.return();
      }
    }

    let nextItem;
    while (!(nextItem = await iterator$.next()).done) {
      yield nextItem.value;
    }
  }
}

/**
 * Propagates the async sequence that reacts first.
 *
 * @export
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @return {AsyncIterable<T>} An async sequence that surfaces either of the given sequences, whichever reacted first.
 */
export function race<TSource>(...sources: AsyncIterable<TSource>[]): AsyncIterableX<TSource> {
  return new RaceAsyncIterable<TSource>(sources);
}
