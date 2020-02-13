import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { create as createStatic } from '../../asynciterable/create';

/** @nocollapse */
AsyncIterableX.create = createStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let create: typeof createStatic;
  }
}
