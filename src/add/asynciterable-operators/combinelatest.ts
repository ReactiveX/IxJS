import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { combineLatest } from '../../asynciterable/combinelatest';

/**
 * @ignore
 */

export function combineLatestProto<T, T2>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
export function combineLatestProto<T, T2, T3>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
export function combineLatestProto<T, T2, T3, T4>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
export function combineLatestProto<T, T2, T3, T4, T5>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
export function combineLatestProto<T, T2, T3, T4, T5, T6>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;

export function combineLatestProto<T, R>(
  this: AsyncIterableX<T>,
  project: (values: [T]) => R
): AsyncIterableX<R>;
export function combineLatestProto<T, T2, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2]) => R,
  source2: AsyncIterable<T2>
): AsyncIterableX<R>;
export function combineLatestProto<T, T2, T3, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<R>;
export function combineLatestProto<T, T2, T3, T4, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<R>;
export function combineLatestProto<T, T2, T3, T4, T5, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4, T5]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<R>;
export function combineLatestProto<T, T2, T3, T4, T5, T6, R>(
  this: AsyncIterableX<T>,
  project: (values: [T, T2, T3, T4, T5, T6]) => R,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<R>;

export function combineLatestProto<T>(
  this: AsyncIterableX<T>,
  ...sources: AsyncIterable<T>[]
): AsyncIterableX<T[]>;
export function combineLatestProto<T, R>(
  this: AsyncIterableX<T>,
  project: (values: T[]) => R,
  ...sources: AsyncIterable<T>[]
): AsyncIterableX<R>;
export function combineLatestProto<T, R>(
  this: AsyncIterableX<T>,
  ...args: any[]
): AsyncIterableX<R> {
  let [arg1, ...sources] = args;
  sources = typeof arg1 === 'function' ? [this, ...sources] : (arg1 = this) && args;
  return combineLatest<T, R>(arg1, ...sources);
}

AsyncIterableX.prototype.combineLatest = combineLatestProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    combineLatest: typeof combineLatestProto;
  }
}
