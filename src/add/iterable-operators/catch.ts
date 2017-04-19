import { IterableX } from '../../iterable';
import { _catch } from '../../iterable/catch';

export function _catchProto<T>(this: IterableX<T>, fn: (error: any) => Iterable<T>): Iterable<T> {
  return _catch<T>(this, fn);
};

IterableX.prototype.catch = _catchProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    catch: typeof _catchProto;
  }
}