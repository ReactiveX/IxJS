import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { race as raceStatic } from '../../asynciterable/race';

/** @nocollapse */
AsyncIterableX.race = raceStatic;

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let race: typeof raceStatic;
  }
}
