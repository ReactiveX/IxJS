import { IterableX } from '../../iterable';
import { takeWhile } from '../../iterable/takewhile';

/**
 * @ignore
 */
export function takeWhileProto<TSource>(
    this: IterableX<TSource>,
    predicate: (value: TSource, index: number) => boolean): IterableX<TSource> {
  return takeWhile(this, predicate);
}

IterableX.prototype.takeWhile = takeWhileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}