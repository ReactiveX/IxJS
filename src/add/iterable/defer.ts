import { IterableX } from '../../iterable';
import { defer as deferStatic } from '../../iterable/defer';

/**
 * @ignore
 */
export function _defer<T>(fn: () => Iterable<T>): IterableX<T> {
  return deferStatic(fn);
}

IterableX.defer = _defer;

declare module '../../iterable' {
  namespace IterableX {
    export let defer: typeof _defer;
  }
}