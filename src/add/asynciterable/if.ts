import { AsyncIterableX } from '../../asynciterable';
import { _if as ifStatic } from '../../asynciterable/if';

AsyncIterableX.if = ifStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { ifStatic as if };
  }
}