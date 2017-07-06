import { AsyncIterableX } from '../../asynciterable';
import { defer as deferStatic } from '../../asynciterable/defer';

AsyncIterableX.defer = deferStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let defer: typeof deferStatic;
  }
}