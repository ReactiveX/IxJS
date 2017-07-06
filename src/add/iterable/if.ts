import { IterableX } from '../../iterable';
import { _if as ifStatic } from '../../iterable/if';

IterableX.if = ifStatic;

declare module '../../iterable' {
  namespace IterableX {
    export { ifStatic as if };
  }
}