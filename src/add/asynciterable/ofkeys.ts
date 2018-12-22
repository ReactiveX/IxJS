import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ofKeys as ofKeysStatic } from '../../asynciterable/ofkeys';

/** @nocollapse */
AsyncIterableX.ofKeys = ofKeysStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let ofKeys: typeof ofKeysStatic; }
}
