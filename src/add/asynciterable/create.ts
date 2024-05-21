import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { create as createStatic } from '../../asynciterable/create.js';

/** @nocollapse */
AsyncIterableX.create = createStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let create: typeof createStatic;
  }
}
