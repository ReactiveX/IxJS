import { IterableX } from '../../iterable';
import { _catchStatic as catchStatic } from '../../iterable/catch';

export function _catchStatic<T>(...args: Iterable<T>[]) {
  return catchStatic<T>(...args);
}

IterableX.catch = _catchStatic;

declare module '../../iterable' {
  namespace IterableX {
    function _catch<T>(...args: Iterable<T>[]): IterableX<T>;
    export { _catch as catch }
  }
}