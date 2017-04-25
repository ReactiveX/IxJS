import { IterableX } from '../../iterable';
import { _catch } from '../../iterable/catch';

export function catchProto<T>(this: IterableX<T>, ...args: Iterable<T>[]): IterableX<T> {
  return new IterableX(_catch<T>(this, ...args));
}

IterableX.prototype.catch = catchProto;

declare module '../../iterable' {
  interface IterableX<T> {
    catch: typeof catchProto;
  }
}