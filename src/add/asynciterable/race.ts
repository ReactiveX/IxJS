import { AsyncIterableX } from '../../asynciterable';
import { race as raceStatic } from '../../asynciterable/race';

/**
 * @ignore
 */
export function _race<T>(left: AsyncIterable<T>, right: AsyncIterable<T>): AsyncIterableX<T> {
  return raceStatic<T>(left, right);
}

AsyncIterableX.race = _race;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let race: typeof _race;
  }
}