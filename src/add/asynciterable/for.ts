import { AsyncIterableX } from '../../asynciterable';
import { _for as forStatic } from '../../asynciterable/for';

AsyncIterableX.for = forStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { forStatic as for };
  }
}