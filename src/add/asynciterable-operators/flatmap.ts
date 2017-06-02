import { AsyncIterableX } from '../../asynciterable';
import { flatMap } from '../../asynciterable/flatmap';

export function flatMapProto<TSource, TResult>(
    this: AsyncIterable<TSource>,
    selector: (value: TSource) => Iterable<TResult | PromiseLike<TResult>> | AsyncIterable<TResult>,
    thisArg?: any): AsyncIterableX<TResult> {
  return flatMap<TSource, TResult>(this, selector);
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}