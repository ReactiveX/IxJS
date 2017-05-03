import { IterableX } from '../../iterable';
import { takeWhile } from '../../iterable/takewhile';

export function takeWhileProto<TSource>(
    this: IterableX<TSource>,
    predicate: (value: TSource, index: number) => boolean): IterableX<TSource> {
  return new IterableX(takeWhile(this, predicate));
}

IterableX.prototype.takeWhile = takeWhileProto;

declare module '../../iterable' {
  interface IterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}