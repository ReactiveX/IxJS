import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { ConcatIterable } from '../concat';

/* tslint:disable:max-line-length */
export function concat<T, T2>(v2: Iterable<T2>): MonoTypeOperatorFunction<T | T2>;
export function concat<T, T2, T3>(
  v2: Iterable<T2>,
  v3: Iterable<T3>
): MonoTypeOperatorFunction<T | T2 | T3>;
export function concat<T, T2, T3, T4>(
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>
): MonoTypeOperatorFunction<T | T2 | T3 | T4>;
export function concat<T, T2, T3, T4, T5>(
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>
): MonoTypeOperatorFunction<T | T2 | T3 | T4 | T5>;
export function concat<T, T2, T3, T4, T5, T6>(
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>,
  v6: Iterable<T6>
): MonoTypeOperatorFunction<T | T2 | T3 | T4 | T5 | T6>;
/* tslint:enable:max-line-length */

export function concat<T>(...args: Iterable<T>[]): MonoTypeOperatorFunction<T> {
  return function concatOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new ConcatIterable<T>([source, ...args]);
  };
}
