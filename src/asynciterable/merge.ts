import { AsyncIterableX } from '../asynciterable';

// tslint:disable-next-line:no-empty
const NEVER_PROMISE = new Promise(() => { });

type MergeResult<T> = { value: T, index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then((value) => ({ value, index })) as Promise<MergeResult<T>>;
}

class MergeAsyncIterable<T> extends AsyncIterableX<T> {
  private _source: AsyncIterable<T>[];

  constructor(source: AsyncIterable<T>[]) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    const length = this._source.length;
    const iterators = new Array<AsyncIterator<T>>(length);
    const nexts = new Array<Promise<MergeResult<IteratorResult<T>>>>(length);
    let active = length;
    for (let i = 0; i < length; i++) {
      const iterator = this._source[i][Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = wrapPromiseWithIndex(iterator.next(), i);
    }

    while (active > 0) {
      const next = Promise.race(nexts);
      const { value: next$, index } = await next;
      if (next$.done) {
        nexts[index] = <Promise<MergeResult<IteratorResult<T>>>>(NEVER_PROMISE);
        active--;
      } else {
        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);
        yield next$.value;
      }
    }
  }
}

export function _mergeAll<TSource>(source: AsyncIterable<TSource>[]): AsyncIterableX<TSource> {
  return new MergeAsyncIterable<TSource>(source);
}

export function merge<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new MergeAsyncIterable<T>([source, ...args]);
}

export function mergeStatic<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new MergeAsyncIterable<T>(args);
}
