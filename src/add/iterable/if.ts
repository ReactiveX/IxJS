import { IterableX } from '../../iterable';
import { _if as ifStatic } from '../../iterable/if';

export function _if<T>(
    fn: () => boolean,
    thenSource: Iterable<T>,
    elseSource?: Iterable<T>): IterableX<T> {
  return new IterableX<T>(ifStatic<T>(fn, thenSource, elseSource));
}

IterableX.if = _if;

declare module '../../iterable' {
  namespace IterableX {
    function _if<T>(
      fn: () => boolean,
      thenSource: Iterable<T>,
      elseSource?: Iterable<T>): IterableX<T>;
    export { _if as if }
  }
}