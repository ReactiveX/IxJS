import { IterableX } from '../../iterable';
import { share } from '../../iterable/share';

function shareProto<TSource, TResult>(
    this: IterableX<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return new IterableX(share(this, fn));
}

IterableX.prototype.share = shareProto;

declare module '../../iterable' {
  interface IterableX<T> {
    share: typeof shareProto;
  }
}