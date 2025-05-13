import { AsyncIterableX } from './asynciterablex.js';
import { wrapWithAbort } from './operators/withabort.js';
import { throwIfAborted } from '../aborterror.js';
import { safeRace } from '../util/safeRace.js';
import { returnAsyncIterators } from '../util/returniterator.js';

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number): Promise<MergeResult<T>> {
  return promise.then((value) => ({ value, index }));
}

/** @ignore */
export class RaceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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

    for (let i = 0; i < length; i++) {
      const iterator = wrapWithAbort(this._sources[i], signal)[Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    const {
      value: { value, done },
      index,
    } = await safeRace(nexts);

    await returnAsyncIterators(iterators.filter((_, i) => i !== index));

    if (!done) {
      yield value;
    }

    for await (const item of {
      [Symbol.asyncIterator]: () => iterators[index],
    }) {
      yield item;
    }
  }
}

/**
 * Propagates the async sequence that reacts first.
 *
 * @param {...AsyncIterable<T>[]} sources The source sequences.
 * @return {AsyncIterable<T>} An async sequence that surfaces either of the given sequences, whichever reacted first.
 */
export function race<TSource>(...sources: AsyncIterable<TSource>[]): AsyncIterableX<TSource> {
  return new RaceAsyncIterable(sources);
}
