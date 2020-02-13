import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { generate as generateStatic } from '../../asynciterable/generate';

/** @nocollapse */
AsyncIterableX.generate = generateStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let generate: typeof generateStatic;
  }
}
