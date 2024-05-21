import { IterableX } from '../../iterable/iterablex.js';
import { publish } from '../../iterable/operators/publish.js';

export function publishProto<T>(this: IterableX<T>): IterableX<T>;
export function publishProto<T, R>(
  this: IterableX<T>,
  selector?: (value: Iterable<T>) => Iterable<R>
): IterableX<R>;
/**
 * @ignore
 */
export function publishProto<T, R>(
  this: IterableX<T>,
  selector?: (value: Iterable<T>) => Iterable<R>
): IterableX<T | R> {
  return publish(selector)(this);
}

IterableX.prototype.publish = publishProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    publish: typeof publishProto;
  }
}
