import { IterableX } from '../../iterable';
import { skipWhile } from '../../iterable/skipwhile';

/**
 * @ignore
 */
export function skipWhileProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function skipWhileProto<TSource>(
  this: IterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource>;
export function skipWhileProto<TSource>(
  this: IterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource> {
  return skipWhile(this, predicate);
}

IterableX.prototype.skipWhile = skipWhileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    skipWhile: typeof skipWhileProto;
  }
}
