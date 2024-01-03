import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { publish } from '../../asynciterable/operators/publish.js';

export function publishProto<TSource>(this: AsyncIterableX<TSource>): AsyncIterableX<TSource>;
export function publishProto<TSource, TResult>(
  this: AsyncIterableX<TSource>,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): AsyncIterableX<TResult>;
/**
 * @ignore
 */
export function publishProto<TSource, TResult>(
  this: AsyncIterableX<TSource>,
  selector?: (value: AsyncIterable<TSource>) => AsyncIterable<TResult>
): AsyncIterableX<TSource | TResult> {
  return publish(selector)(this);
}

AsyncIterableX.prototype.publish = publishProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    publish: typeof publishProto;
  }
}
