import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { CombineLatestAsyncIterable } from '../combinelatest';
import { identityAsync } from '../../internal/identity';

export function combineLatest<T, T2>(
  source: AsyncIterable<T>,
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, [T, T2]>;
export function combineLatest<T, T2, T3>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, [T, T2, T3]>;
export function combineLatest<T, T2, T3, T4>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, [T, T2, T3, T4]>;
export function combineLatest<T, T2, T3, T4, T5>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5]>;
export function combineLatest<T, T2, T3, T4, T5, T6>(
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, [T, T2, T3, T4, T5, T6]>;

export function combineLatest<T, T2, R>(
  project: (values: [T, T2]) => R | Promise<R>,
  source2: AsyncIterable<T2>
): OperatorAsyncFunction<T, R>;
export function combineLatest<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): OperatorAsyncFunction<T, R>;
export function combineLatest<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): OperatorAsyncFunction<T, R>;
export function combineLatest<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): OperatorAsyncFunction<T, R>;
export function combineLatest<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R | Promise<R>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): OperatorAsyncFunction<T, R>;

export function combineLatest<T>(...sources: AsyncIterable<T>[]): OperatorAsyncFunction<T, T[]>;
export function combineLatest<T, R>(
  project: (values: T[]) => R | Promise<R>,
  ...sources: AsyncIterable<T>[]
): OperatorAsyncFunction<T, R>;
/* tslint:enable:max-line-length */
export function combineLatest<T, R>(...sources: any[]): OperatorAsyncFunction<T, R> {
  return function combineLatestOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<R> {
    let fn = (sources.shift() || identityAsync) as (values: any[]) => R | Promise<R>;
    if (fn && typeof fn !== 'function') {
      sources.unshift(fn);
      fn = identityAsync;
    }
    return new CombineLatestAsyncIterable<T, R>([source, ...sources] as AsyncIterable<T>[], fn);
  };
}
