import { IterableImpl } from '../../iterable';
import { _catch } from '../../iterable/catch';

function _catchProto<T>(this: IterableImpl<T>, fn: (error: any) => Iterable<T>): Iterable<T> {
  return _catch<T>(this, fn);
};

IterableImpl.prototype.catch = _catchProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    catch: typeof _catchProto;
  }
}