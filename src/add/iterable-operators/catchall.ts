import { IterableX } from '../../iterable';
import { catchAll } from '../../iterable/catchall';

export function catchAllProto<T>(this: IterableX<T>, ...args: Iterable<T>[]): Iterable<T> {
  return catchAll<T>(this, ...args);
};
IterableX.prototype.catchAll = catchAllProto;

declare module '../../iterable' {
  interface IterableX<T> {
    catchAll: typeof catchAllProto;
  }
}