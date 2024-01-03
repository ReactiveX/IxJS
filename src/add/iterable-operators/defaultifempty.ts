import { IterableX } from '../../iterable/iterablex.js';
import { DefaultIfEmptyIterable } from '../../iterable/operators/defaultifempty.js';

/**
 * @ignore
 */
export function defaultIfEmptyProto<T>(this: IterableX<T>, defaultValue: T): IterableX<T> {
  return new DefaultIfEmptyIterable<T>(this, defaultValue);
}

IterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}
