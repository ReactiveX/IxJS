import { AsyncIterableX } from '../../asynciterable';
import { flatMap } from '../../asynciterable/flatmap';

export function flatMapProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    fn: (value: TSource) => AsyncIterable<TResult>,
    thisArg?: any): AsyncIterableX<TResult> {
  return new AsyncIterableX(flatMap<TSource, TResult>(this, fn));
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}