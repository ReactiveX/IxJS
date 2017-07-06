import { AsyncIterableX } from '../../asynciterable';
import { empty as emptyStatic } from '../../asynciterable/empty';

AsyncIterableX.empty = emptyStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let empty: typeof emptyStatic;
  }
}