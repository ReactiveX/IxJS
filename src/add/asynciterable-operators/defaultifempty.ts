import { AsyncIterableX } from '../../asynciterable';
import { defaultIfEmpty } from '../../asynciterable/defaultifempty';

export function defaultIfEmptyProto<T>(
    this: AsyncIterableX<T>,
    defaultValue: T): AsyncIterableX<T> {
  return new AsyncIterableX(defaultIfEmpty<T>(this, defaultValue));
}

AsyncIterableX.prototype.defaultIfEmpty = defaultIfEmptyProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    defaultIfEmpty: typeof defaultIfEmptyProto;
  }
}