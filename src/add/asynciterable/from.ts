import { AsyncIterableX } from '../../asynciterable';
import { from as fromStatic } from '../../asynciterable/from';

AsyncIterableX.from = fromStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let from: typeof fromStatic;
  }
}