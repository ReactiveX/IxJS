import { AsyncIterableX } from '../../asynciterable';
import { range } from '../../asynciterable/range';

/**
 * @ignore
 */
export function _range(start: number, count: number): AsyncIterableX<number> {
  return range(start, count);
}

AsyncIterableX.range = _range;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let range: typeof _range;
  }
}