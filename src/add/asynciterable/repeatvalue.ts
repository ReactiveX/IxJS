import { AsyncIterableX } from '../../asynciterable';
import { repeatValue as repeatValueStatic } from '../../asynciterable/repeatvalue';

AsyncIterableX.repeat = repeatValueStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let repeat: typeof repeatValueStatic;
  }
}