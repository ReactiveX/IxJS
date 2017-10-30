import { IterableX } from '../../iterable/iterablex';
import { defaultIfEmpty } from '../../iterable/defaultifempty';

/**
 * @ignore
 */
export function defaultIfEmptyProto<T>(this: IterableX<T>, defaultValue: T): IterableX<T> {
  return defaultIfEmpty<T>(this, defaultValue);
}

IterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}
