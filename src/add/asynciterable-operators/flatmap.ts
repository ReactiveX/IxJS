import { AsyncIterableX } from '../../asynciterable/asynciterablex';
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

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    flatMap: typeof flatMapProto;
  }
}
