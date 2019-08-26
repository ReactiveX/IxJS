import { IterableX } from '../../iterable/iterablex';
import { defaultIfEmpty } from '../../iterable/operators/defaultifempty';

/**
 * @ignore
 */
export function defaultIfEmptyProto<T>(this: IterableX<T>, defaultValue: T): IterableX<T> {
  return defaultIfEmpty<T>(defaultValue)(this);
}

IterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}
