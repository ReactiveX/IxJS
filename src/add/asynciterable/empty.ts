import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { empty as emptyStatic } from '../../asynciterable/empty';

/** @nocollapse */
AsyncIterableX.empty = emptyStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let empty: typeof emptyStatic; }
}
