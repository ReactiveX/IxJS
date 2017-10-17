import { AsyncIterableX } from '../../asynciterable';
import { flatMap } from '../../asynciterable/flatmap';

/**
 * @ignore
 */
export function flatMapProto<TSource, TResult>(
  this: AsyncIterableX<TSource>,
  selector: (value: TSource) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  thisArg?: any
): AsyncIterableX<TResult> {
  return flatMap<TSource, TResult>(this, selector, thisArg);
}

AsyncIterableX.prototype.flatMap = flatMapProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
