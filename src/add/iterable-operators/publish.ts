import { IterableX } from '../../iterable/iterablex';
import { publish } from '../../iterable/publish';

export function publishProto<TSource>(this: IterableX<TSource>): IterableX<TSource>;
export function publishProto<TSource, TResult>(
  this: IterableX<TSource>,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): IterableX<TResult>;
/**
 * @ignore
 */
export function publishProto<TSource, TResult>(
  this: IterableX<TSource>,
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): IterableX<TSource | TResult> {
  return publish(this, selector);
}

IterableX.prototype.publish = publishProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    publish: typeof publishProto;
  }
}
