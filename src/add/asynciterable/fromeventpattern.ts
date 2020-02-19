import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern';

/** @nocollapse */
AsyncIterableX.fromEventPattern = fromEventPatternStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let fromEventPattern: typeof fromEventPatternStatic;
  }
}
