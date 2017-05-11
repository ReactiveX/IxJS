import { AsyncIterableX } from '../../asynciterable';
import { share } from '../../asynciterable/share';

export function shareProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    fn?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  return new AsyncIterableX(share(this, fn));
}

AsyncIterableX.prototype.share = shareProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    share: typeof shareProto;
  }
}