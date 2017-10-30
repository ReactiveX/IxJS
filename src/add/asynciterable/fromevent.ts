import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromEvent as fromEventStatic } from '../../asynciterable/fromevent';

AsyncIterableX.fromEvent = fromEventStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let fromEvent: typeof fromEventStatic; }
}
