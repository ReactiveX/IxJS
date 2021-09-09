import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { as as asStatic } from '../../asynciterable/as';

/** @nocollapse */
AsyncIterableX.as = asStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let as: typeof asStatic;
  }
}
