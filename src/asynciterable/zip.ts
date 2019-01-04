import { AsyncIterableX } from './asynciterablex';
import { identityAsync } from '../util/identity';
import { returnAsyncIterator } from '../util/returniterator';
import { OperatorAsyncFunction } from '../interfaces';

export class ZipAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _sources: AsyncIterable<TSource>[];
  private _fn: (values: any[]) => TResult | Promise<TResult>;

  constructor(
    sources: AsyncIterable<TSource>[],
    fn: (values: any[]) => TResult | Promise<TResult>
  ) {
    super();
    this._sources = sources;
    this._fn = fn;
  }

  async *[Symbol.asyncIterator](): AsyncIterableIterator<TResult> {
    const fn = this._fn;
    const sourcesLength = this._sources.length;
    const its = this._sources.map(x => x[Symbol.asyncIterator]());
    do {
      const values = new Array(sourcesLength);
      for (let i = -1; ++i < sourcesLength; ) {
        const result = await its[i].next();
        if (result.done) {
          await Promise.all(its.map(returnAsyncIterator));
          return undefined;
        }
        values[i] = result.value;
      }
      yield await fn(values);
    } while (1);
  }
}

export function zip<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, [T, T2]>;
export function zip<T, T2, T3>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, [T, T2, T3]>;
export function zip<T, T2, T3, T4>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, [T, T2, T3, T4]>;
export function zip<T, T2, T3, T4, T5>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>;
export function zip<T, T2, T3, T4, T5, T6>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>;

export function zip<T, T2, R>(
  project: (values: [T, T2]) => R | Promise<R>,
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, R>;
export function zip<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, R>;
export function zip<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, R>;
export function zip<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, R>;
export function zip<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, R>;

export function zip<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;
export function zip<T, R>(
  project: (values: T[]) => R | Promise<R>,
  ...sources: AsyncIterable<T>[]
): OperatorAsyncFunction<T, R>;
/* tslint:enable:max-line-length */
export function zip<T, R>(...sources: any[]): OperatorAsyncFunction<T, R> {
  return function zipOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<R> {
    let fn = sources.shift() as (values: any[]) => R | Promise<R>;
    if (typeof fn !== 'function') {
      sources.unshift(fn);
      fn = identityAsync;
    }
    return new ZipAsyncIterable<T, R>([source, ...sources] as AsyncIterable<T>[], fn);
  };
}
