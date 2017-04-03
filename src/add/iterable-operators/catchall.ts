import { Iterable } from '../../iterable';
import { catchAll } from '../../iterable/catchall';

Iterable.prototype.catchAll = function<T>(...args: Iterable<T>[]): Iterable<T> {
  return catchAll<T>(this, ...args);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    catchAll(...args: Iterable<T>[]): Iterable<T>
  }
}