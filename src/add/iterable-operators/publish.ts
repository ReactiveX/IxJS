import { IterableX } from '../../iterable';
import { publish } from '../../iterable/publish';

export function publishProto<TSource>(
    this: Iterable<TSource>): IterableX<TSource>;
export function publishProto<TSource, TResult>(
    this: Iterable<TSource>,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TResult>;
/**
 * @ignore
 */
export function publishProto<TSource, TResult>(
    this: Iterable<TSource>,
    selector?: (value: Iterable<TSource>) => Iterable<TResult>): IterableX<TSource | TResult> {
  return publish(this, selector);
}

IterableX.prototype.publish = publishProto;

declare module '../../iterable' {
  interface IterableX<T> {
    publish: typeof publishProto;
  }
}