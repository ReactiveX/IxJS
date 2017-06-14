import { AsyncIterableX } from '../../asynciterable';
import { publish } from '../../asynciterable/publish';

export function publishProto<TSource>(
    this: AsyncIterableX<TSource>): AsyncIterableX<TSource>;
export function publishProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function publishProto<TSource, TResult>(
    this: AsyncIterableX<TSource>,
    selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>): AsyncIterableX<TSource | TResult> {
  return publish(this, selector);
}

AsyncIterableX.prototype.publish = publishProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    publish: typeof publishProto;
  }
}