import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern.js';

/** @nocollapse */
AsyncIterableX.fromEventPattern = fromEventPatternStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromEventPattern: typeof fromEventPatternStatic;
  }
}
