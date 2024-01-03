import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { fromEvent as fromEventStatic } from '../../asynciterable/fromevent.js';

/** @nocollapse */
AsyncIterableX.fromEvent = fromEventStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromEvent: typeof fromEventStatic;
  }
}
