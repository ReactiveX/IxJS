import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern';

/** @nocollapse */
AsyncIterableX.fromEventPattern = fromEventPatternStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let fromEventPattern: typeof fromEventPatternStatic;
  }
}
