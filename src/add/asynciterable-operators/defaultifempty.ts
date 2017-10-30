import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { defaultIfEmpty } from '../../asynciterable/defaultifempty';

/**
 * @ignore
 */
export function defaultIfEmptyProto<T>(
  this: AsyncIterableX<T>,
  defaultValue: T
): AsyncIterableX<T> {
  return defaultIfEmpty<T>(this, defaultValue);
}

AsyncIterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}
