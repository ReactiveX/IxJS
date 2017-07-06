import { AsyncIterableX } from '../../asynciterable';
import { _throw as throwStatic } from '../../asynciterable/throw';

AsyncIterableX.throw = throwStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { throwStatic as throw };
  }
}