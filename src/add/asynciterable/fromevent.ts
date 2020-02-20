import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromEvent as fromEventStatic } from '../../asynciterable/fromevent';

/** @nocollapse */
AsyncIterableX.fromEvent = fromEventStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromEvent: typeof fromEventStatic;
  }
}
