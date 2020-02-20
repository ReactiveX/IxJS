import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { generateTime as generateTimeStatic } from '../../asynciterable/generatetime';

/** @nocollapse */
AsyncIterableX.generateTime = generateTimeStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let generateTime: typeof generateTimeStatic;
  }
}
