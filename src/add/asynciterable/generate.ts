import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { generate as generateStatic } from '../../asynciterable/generate';

/** @nocollapse */
AsyncIterableX.generate = generateStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let generate: typeof generateStatic;
  }
}
