import { IterableX } from '../../iterable';
import { takeWhile } from '../../iterable/takewhile';

/**
 * @ignore
 */
export function takeWhileProto<T, S extends T>(
  this: IterableX<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function takeWhileProto<TSource>(
  this: IterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource>;
export function takeWhileProto<TSource>(
  this: IterableX<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource> {
  return takeWhile(this, predicate);
}

IterableX.prototype.takeWhile = takeWhileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}
