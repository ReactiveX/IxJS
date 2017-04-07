import { IterableImpl } from '../../iterable';
import { catchAll } from '../../iterable/catchall';

function catchAllProto<T>(this: IterableImpl<T>, ...args: Iterable<T>[]): Iterable<T> {
  return catchAll<T>(this, ...args);
};
IterableImpl.prototype.catchAll = catchAllProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    catchAll: typeof catchAllProto;
  }
}