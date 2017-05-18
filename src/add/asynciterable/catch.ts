import { AsyncIterableX } from '../../asynciterable';
import { _catchStatic as catchStatic } from '../../asynciterable/catch';

export function _catchStatic<T>(...args: AsyncIterable<T>[]) {
  return catchStatic<T>(...args);
}

AsyncIterableX.catch = _catchStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    function _catch<T>(...args: AsyncIterable<T>[]): AsyncIterableX<T>;
    export { _catch as catch }
  }
}