import { identity, identityAsync } from '../internal/identity';

// tslint:disable-next-line:no-empty
const NEVER_PROMISE = new Promise(() => {});

type MergeResult<T> = { value: T; index: number };

function wrapPromiseWithIndex<T>(promise: Promise<T>, index: number) {
  return promise.then(value => ({ value, index })) as Promise<MergeResult<T>>;
}

export function forkJoin<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): Promise<[T, T2] | undefined>;
export function forkJoin<T, T2, T3>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): Promise<[T, T2, T3] | undefined>;
export function forkJoin<T, T2, T3, T4>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): Promise<[T, T2, T3, T4] | undefined>;
export function forkJoin<T, T2, T3, T4, T5>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): Promise<[T, T2, T3, T4, T5] | undefined>;
export function forkJoin<T, T2, T3, T4, T5, T6>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): Promise<[T, T2, T3, T4, T5, T6] | undefined>;

export function forkJoin<T, R>(
  project: (values: [T]) => R | Promise<R>,
  source: AsyncIterable<T>
): Promise<R | undefined>;
export function forkJoin<T, T2, R>(
  project: (values: [T, T2]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): Promise<R | undefined>;
export function forkJoin<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): Promise<R | undefined>;
export function forkJoin<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): Promise<R | undefined>;
export function forkJoin<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): Promise<R | undefined>;
export function forkJoin<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R | Promise<R>,
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): Promise<R | undefined>;

export function forkJoin<T>(...sources: AsyncIterable<T>[]): Promise<T[] | undefined>;
export function forkJoin<T, R>(
  project: (values: T[]) => R | Promise<R>,
  ...sources: AsyncIterable<T>[]
): Promise<R | undefined>;

export async function forkJoin<T, R>(...sources: any[]): Promise<R | undefined> {
  let fn = (sources.shift() || identityAsync) as (values: any[]) => R | Promise<R>;
  if (fn && typeof fn !== 'function') {
    sources.unshift(fn);
    fn = identityAsync;
  }

  const length = sources.length;
  const iterators = new Array<AsyncIterator<T>>(length);
  const nexts = new Array<Promise<MergeResult<IteratorResult<T>>>>(length);

  let active = length;
  const values = new Array<T>(length);
  const hasValues = new Array<boolean>(length);
  hasValues.fill(false);

  for (let i = 0; i < length; i++) {
    const iterator = sources[i][Symbol.asyncIterator]();
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
    return await fn(values);
  }

  return undefined;
}
