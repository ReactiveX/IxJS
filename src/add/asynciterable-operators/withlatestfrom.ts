import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { WithLatestFromAsyncIterable } from '../../asynciterable/operators/withlatestfrom.js';

/**
 * @ignore
 */
export function withLatestFromProto<T, T2>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>
): AsyncIterableX<[T, T2]>;
export function withLatestFromProto<T, T2, T3>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>
): AsyncIterableX<[T, T2, T3]>;
export function withLatestFromProto<T, T2, T3, T4>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>
): AsyncIterableX<[T, T2, T3, T4]>;
export function withLatestFromProto<T, T2, T3, T4, T5>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>
): AsyncIterableX<[T, T2, T3, T4, T5]>;
export function withLatestFromProto<T, T2, T3, T4, T5, T6>(
  this: AsyncIterableX<T>,
  source2: AsyncIterable<T2>,
  source3: AsyncIterable<T3>,
  source4: AsyncIterable<T4>,
  source5: AsyncIterable<T5>,
  source6: AsyncIterable<T6>
): AsyncIterableX<[T, T2, T3, T4, T5, T6]>;
export function withLatestFromProto<T>(
  this: AsyncIterableX<T>,
  ...sources: AsyncIterableX<T>[]
): AsyncIterableX<T[]>;

export function withLatestFromProto<T>(
  this: AsyncIterableX<T>,
  ...args: any[]
): AsyncIterableX<T[]> {
  return new WithLatestFromAsyncIterable<T>(this, args);
}

AsyncIterableX.prototype.withLatestFrom = withLatestFromProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    withLatestFrom: typeof withLatestFromProto;
  }
}
