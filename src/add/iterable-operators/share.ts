import { IterableX } from '../../iterable/iterablex';
import { share } from '../../iterable/operators/share';

export function shareProto<TSource>(this: IterableX<TSource>): IterableX<TSource>;
export function shareProto<TSource, TResult>(
  this: IterableX<TSource>,
  fn?: (value: Iterable<TSource>) => Iterable<TResult>
): IterableX<TResult>;
/**
 * @ignore
 */
export function shareProto<T, R>(
  this: IterableX<T>,
  fn?: (value: Iterable<T>) => Iterable<R>
): IterableX<T | R> {
  return share(fn)(this);
}

IterableX.prototype.share = shareProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    share: typeof shareProto;
  }
}
