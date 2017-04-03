import { Iterable } from '../../iterable';
import { average } from '../../iterable/average';

Iterable.prototype.average = function (fn?) {
  return average(this, fn);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    average: (fn?: (value: T) => number) => number
  }
}