import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { generateTime as generateTimeStatic } from '../../asynciterable/generatetime.js';

/** @nocollapse */
AsyncIterableX.generateTime = generateTimeStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let generateTime: typeof generateTimeStatic;
  }
}
