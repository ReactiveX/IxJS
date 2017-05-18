import { AsyncIterableX } from '../../asynciterable';
import { _catch } from '../../asynciterable/catch';

export function catchProto<T>(this: AsyncIterableX<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _catch<T>(this, ...args);
}

AsyncIterableX.prototype.catch = catchProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    catch: typeof catchProto;
  }
}