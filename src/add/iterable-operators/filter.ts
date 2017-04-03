import { Iterable } from '../../iterable';
import { filter } from '../../iterable/filter';

Iterable.prototype.filter = function<T>(fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T> {
  return filter(this, fn, thisArg);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    filter(fn: (value: T, index: number) => boolean, thisArg?: any): Iterable<T>
  }
}