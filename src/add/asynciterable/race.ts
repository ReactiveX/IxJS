import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { race as raceStatic } from '../../asynciterable/race.js';

/** @nocollapse */
AsyncIterableX.race = raceStatic;

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let race: typeof raceStatic;
  }
}
