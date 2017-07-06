import { AsyncIterableX } from '../../asynciterable';
import { race as raceStatic } from '../../asynciterable/race';

AsyncIterableX.race = raceStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let race: typeof raceStatic;
  }
}