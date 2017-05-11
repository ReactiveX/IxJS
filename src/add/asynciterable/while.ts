import { AsyncIterableX } from '../../asynciterable';
import { _while as whileStatic } from '../../asynciterable/while';

export function _while<T>(
    fn: () => boolean,
    source: AsyncIterable<T>): AsyncIterableX<T> {
  return new AsyncIterableX<T>(whileStatic<T>(fn, source));
}

AsyncIterableX.while = _while;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    function _while<T>(
    fn: () => boolean,
    source: AsyncIterable<T>): AsyncIterableX<T>;
    export { _while as while }
  }
}