import { Iterable } from '../../iterable';
import { map } from '../../iterable/map';

Iterable.prototype.map = function<T, U>(fn: (value: T, index: number) => U, thisArg?: any): Iterable<U> {
  return map(this, fn, thisArg);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    map<U>(fn: (value: T, index: number) => U, thisArg?: any): Iterable<U>;
  }
}