import { AsyncIterableX } from '../../asynciterable';
import { defer as deferStatic } from '../../asynciterable/defer';

export function _defer<T>(fn: () => AsyncIterable<T>): AsyncIterableX<T> {
  return deferStatic(fn);
}

AsyncIterableX.defer = _defer;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let defer: typeof _defer;
  }
}