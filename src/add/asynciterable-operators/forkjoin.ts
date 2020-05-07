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

export function forkJoinProto<T>(
  this: AsyncIterableX<T>,
  ...sources: AsyncIterable<T>[]
): Promise<T[] | undefined>;
export function forkJoinProto<T>(
  this: AsyncIterableX<T>,
  ...args: any[]
): Promise<T[] | undefined> {
  return forkJoin<T>(...[this, ...args]);
}

AsyncIterableX.prototype.forkJoin = forkJoinProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    forkJoin: typeof forkJoinProto;
  }
}
