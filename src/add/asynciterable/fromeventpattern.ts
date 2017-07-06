import { AsyncIterableX } from '../../asynciterable';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern';

AsyncIterableX.fromEventPattern = fromEventPatternStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let fromEventPattern: typeof fromEventPatternStatic;
  }
}