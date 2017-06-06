import { IterableX } from '../../iterable';
import { _while as whileStatic } from '../../iterable/while';

export function _while<T>(
    fn: () => boolean,
    source: Iterable<T>): IterableX<T> {
  return whileStatic<T>(fn, source);
}

IterableX.if = _while;

declare module '../../iterable' {
  namespace IterableX {
    function _while<T>(
    fn: () => boolean,
    source: Iterable<T>): IterableX<T>;
    export { _while as while };
  }
}