import { AsyncIterableX } from '../../asynciterable';
import { share } from '../../asynciterable/share';

export function shareProto<TSource>(
    this: AsyncIterable<TSource>): AsyncIterableX<TSource>;
export function shareProto<TSource, TResult>(
    this: AsyncIterable<TSource>,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>):
      AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function shareProto<TSource, TResult = TSource>(
    this: AsyncIterable<TSource>,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>):
      AsyncIterableX<TSource | TResult> {
  return share(this, selector);
}

AsyncIterableX.prototype.share = shareProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    share: typeof shareProto;
  }
}