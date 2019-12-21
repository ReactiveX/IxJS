import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { share } from '../../asynciterable/operators/share';

export function shareProto<TSource>(this: AsyncIterableX<TSource>): AsyncIterableX<TSource>;
export function shareProto<TSource, TResult>(
  this: AsyncIterableX<TSource>,
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function shareProto<TSource, TResult = TSource>(
  this: AsyncIterableX<TSource>,
  selector?: (
    value: AsyncIterable<TSource>
  ) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): AsyncIterableX<TSource | TResult> {
  return share(selector)(this);
}

AsyncIterableX.prototype.share = shareProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    share: typeof shareProto;
  }
}
