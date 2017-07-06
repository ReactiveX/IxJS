import { AsyncIterableX } from '../../asynciterable';
import { of as ofStatic } from '../../asynciterable/of';

AsyncIterableX.of = ofStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let of: typeof ofStatic;
  }
}