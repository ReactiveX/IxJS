import { AsyncIterableX } from '../../asynciterable';
import { takeWhile } from '../../asynciterable/takewhile';

export function takeWhileProto<TSource>(
    this: AsyncIterableX<TSource>,
    predicate: (value: TSource, index: number) => boolean): AsyncIterableX<TSource> {
  return new AsyncIterableX(takeWhile(this, predicate));
}

AsyncIterableX.prototype.takeWhile = takeWhileProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    takeWhile: typeof takeWhileProto;
  }
}