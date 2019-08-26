import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { forkJoin } from '../../asynciterable/forkjoin';

/**
 * @ignore
 */

export function forkJoinProto<T, T2>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>
): Promise<[T, T2] | undefined>;
export function forkJoinProto<T, T2, T3>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): Promise<[T, T2, T3] | undefined>;
export function forkJoinProto<T, T2, T3, T4>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): Promise<[T, T2, T3, T4] | undefined>;
export function forkJoinProto<T, T2, T3, T4, T5>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): Promise<[T, T2, T3, T4, T5] | undefined>;
export function forkJoinProto<T, T2, T3, T4, T5, T6>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): Promise<[T, T2, T3, T4, T5, T6] | undefined>;

export function forkJoinProto<T, R>(
  this: AsyncIterableX<T>,
  project: (values: [T]) => R
): Promise<R>;
export function forkJoinProto<T, T2, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2]) => R,
  source2: AsyncIterable<T2>
): Promise<R | undefined>;
export function forkJoinProto<T, T2, T3, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): Promise<R | undefined>;
export function forkJoinProto<T, T2, T3, T4, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): Promise<R | undefined>;
export function forkJoinProto<T, T2, T3, T4, T5, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4, T5]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): Promise<R | undefined>;
export function forkJoinProto<T, T2, T3, T4, T5, T6, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4, T5, T6]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): Promise<R | undefined>;

export function forkJoinProto<T>(
  this: AsyncIterableX<T>,
  ...sources: AsyncIterable<T>[]
): Promise<T[] | undefined>;
export function forkJoinProto<T, R>(
  this: AsyncIterableX<T>,
  project: (values: T[]) => R,
  ...sources: AsyncIterable<T>[]
): Promise<R | undefined>;
/* tslint:enable:max-line-length */
export function forkJoinProto<T, R>(
  this: AsyncIterableX<T>,
  ...args: any[]
): Promise<R | undefined> {
  let [arg1, ...sources] = args;
  sources = typeof arg1 === 'function' ? [this, ...sources] : (arg1 = this) && args;
  return forkJoin<T, R>(arg1, ...sources);
}

AsyncIterableX.prototype.forkJoin = forkJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    forkJoin: typeof forkJoinProto;
  }
}
