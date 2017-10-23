import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { ConcatAsyncIterable } from '../concat';

/* tslint:disable:max-line-length */
export function concat<T, T2>(
  v2: AsyncIterable<T2>
): MonoTypeOperatorAsyncFunction<T | T2>;
export function concat<T, T2, T3>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>
): MonoTypeOperatorAsyncFunction<T | T2 | T3>;
export function concat<T, T2, T3, T4>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>
): MonoTypeOperatorAsyncFunction<T | T2 | T3 | T4>;
export function concat<T, T2, T3, T4, T5>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>
): MonoTypeOperatorAsyncFunction<T | T2 | T3 | T4 | T5>;
export function concat<T, T2, T3, T4, T5, T6>(
  v2: AsyncIterable<T2>,
  v3: AsyncIterable<T3>,
  v4: AsyncIterable<T4>,
  v5: AsyncIterable<T5>,
  v6: AsyncIterable<T6>
): MonoTypeOperatorAsyncFunction<T | T2 | T3 | T4 | T5 | T6>;
/* tslint:enable:max-line-length */

export function concat<T>(
  ...args: AsyncIterable<T>[]
): MonoTypeOperatorAsyncFunction<T> {
  return function concatOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new ConcatAsyncIterable<T>([source, ...args]);
  };
}
