import { AsyncIterableX } from '../asynciterable';

// tslint:disable-next-line:no-empty
const NEVER_PROMISE = new Promise(() => { });

class MergeAsyncIterable<T> extends AsyncIterableX<T> {
  private _source: AsyncIterable<T>[];

  constructor(source: AsyncIterable<T>[]) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    const length = this._source.length;
    const iterators = new Array<AsyncIterator<T>>(length);
    const nexts = new Array<Promise<IteratorResult<T>>>(length);
    let active = length;
    for (let i = 0; i < length; i++) {
      const iterator = this._source[i][Symbol.asyncIterator]();
      iterators[i] = iterator;
      nexts[i] = iterator.next();
    }

    while (active > 0) {
      const next = Promise.race(nexts);
      const index = nexts.indexOf(next);
      const next$ = await next;
      if (next$.done) {
        nexts[index] = <Promise<IteratorResult<T>>>(NEVER_PROMISE);
        active--;
      } else {
        const iterator$ = iterators[index];
        nexts[index] = iterator$.next();
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
