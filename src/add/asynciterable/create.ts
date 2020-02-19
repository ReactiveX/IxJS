import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { create as createStatic } from '../../asynciterable/create';

/** @nocollapse */
AsyncIterableX.create = createStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let create: typeof createStatic;
  }
}
