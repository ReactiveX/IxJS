import { AsyncIterableX } from '../../asynciterable';
import { fromEvent as fromEventStatic } from '../../asynciterable/fromevent';

AsyncIterableX.fromEvent = fromEventStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let fromEvent: typeof fromEventStatic;
  }
}