import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { empty as emptyStatic } from '../../asynciterable/empty';

/** @nocollapse */
AsyncIterableX.empty = emptyStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let empty: typeof emptyStatic;
  }
}
