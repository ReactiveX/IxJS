import { IterableX } from '../../iterable/iterablex.js';
import { ConcatIterable } from '../../iterable/concat.js';

/**
 * @ignore
 */
export function concatProto<T>(this: IterableX<T>): IterableX<T>;
/**
 * @ignore
 */
export function concatProto<T, T2>(this: IterableX<T>, v2: Iterable<T2>): IterableX<T | T2>;
export function concatProto<T, T2, T3>(
  this: IterableX<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>
): IterableX<T | T2 | T3>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4>(
  this: IterableX<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>
): IterableX<T | T2 | T3 | T4>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4, T5>(
  this: IterableX<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>
): Iterable<T | T2 | T3 | T4 | T5>;
/**
 * @ignore
 */
export function concatProto<T, T2, T3, T4, T5, T6>(
  this: IterableX<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>,
  v6: Iterable<T6>
): Iterable<T | T2 | T3 | T4 | T5 | T6>;

/**
 * @ignore
 */
export function concatProto<T>(this: IterableX<T>, ...args: Iterable<T>[]): IterableX<T> {
  // @ts-ignore
  return new ConcatIterable<T>([this, ...args]);
}

IterableX.prototype.concat = concatProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    concat: typeof concatProto;
  }
}
