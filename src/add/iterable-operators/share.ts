import { IterableX } from '../../iterable';
import { share } from '../../iterable/share';

export function shareProto<TSource>(
    this: Iterable<TSource>): IterableX<TSource>;
export function shareProto<TSource, TResult>(
    this: Iterable<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
/**
 * @ignore
 */
export function shareProto<TSource, TResult>(
    this: Iterable<TSource>,
    fn?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return share(this, fn);
}

IterableX.prototype.share = shareProto;

declare module '../../iterable' {
  interface IterableX<T> {
    share: typeof shareProto;
  }
}