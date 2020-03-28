import { AsyncIterableX } from './asynciterablex';
import { wrapWithAbort } from './operators/withabort';

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
      const next = Promise.race(nexts);
      const { value: next$, index } = await next;
      if (next$.done) {
        nexts[index] = <Promise<MergeResult<IteratorResult<T>>>>NEVER_PROMISE;
        active--;
      } else {
        const iterator$ = iterators[index];
        nexts[index] = wrapPromiseWithIndex(iterator$.next(), index);
        yield next$.value;
      }
    }
  }
}

export function merge<T>(source: AsyncIterable<T>): AsyncIterableX<T>;
export function merge<T, T2>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>
): AsyncIterableX<T | T2>;
export function merge<T, T2, T3>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
export function merge<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
export function merge<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
export function merge<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;
export function merge<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T>;

export function merge<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new MergeAsyncIterable<T>([source, ...args]);
}

export function mergeStatic<T>(v1: AsyncIterable<T>): AsyncIterableX<T>;
export function mergeStatic<T, T2>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>
): AsyncIterableX<T | T2>;
export function mergeStatic<T, T2, T3>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): AsyncIterableX<T | T2 | T3>;
export function mergeStatic<T, T2, T3, T4>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): AsyncIterableX<T | T2 | T3 | T4>;
export function mergeStatic<T, T2, T3, T4, T5>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): AsyncIterable<T | T2 | T3 | T4 | T5>;
export function mergeStatic<T, T2, T3, T4, T5, T6>(
  v1: AsyncIterable<T>,
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): AsyncIterable<T | T2 | T3 | T4 | T5 | T6>;

export function mergeStatic<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return new MergeAsyncIterable<T>(args);
}
