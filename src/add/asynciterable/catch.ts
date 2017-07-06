import { AsyncIterableX } from '../../asynciterable';
import { _catchStatic as catchStatic } from '../../asynciterable/catch';

AsyncIterableX.catch = catchStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { catchStatic as catch };
  }
}