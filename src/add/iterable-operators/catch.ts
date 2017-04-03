import { Iterable } from '../../iterable';
import { _catch } from '../../iterable/catch';

Iterable.prototype.catch = function<T>(fn: (error: any) => Iterable<T>): Iterable<T> {
  return _catch<T>(this, fn);
};

declare module '../../Iterable' {
  interface Iterable<T> {
    catch(fn: (error: any) => Iterable<T>): Iterable<T>
  }
}