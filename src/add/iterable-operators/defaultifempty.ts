import { IterableX } from '../../iterable';
import { defaultIfEmpty } from '../../iterable/defaultifempty';

/**
 * @ignore
 */
export function defaultIfEmptyProto<T>(
    this: IterableX<T>,
    defaultValue: T): IterableX<T> {
  return defaultIfEmpty<T>(this, defaultValue);
}

IterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../iterable' {
  interface IterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}