import { AsyncIterableX } from '../../asynciterable';
import { _if as ifStatic } from '../../asynciterable/if';

export function _if<T>(
    fn: () => boolean | Promise<boolean>,
    thenSource: AsyncIterable<T>,
    elseSource?: AsyncIterable<T>): AsyncIterableX<T> {
  return ifStatic<T>(fn, thenSource, elseSource);
}

AsyncIterableX.if = _if;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    function _if<T>(
      fn: () => boolean | Promise<boolean>,
      thenSource: AsyncIterable<T>,
      elseSource?: AsyncIterable<T>): AsyncIterableX<T>;
    export { _if as if };
  }
}