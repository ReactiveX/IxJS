import { AsyncIterableX } from '../../asynciterable';
import { of as staticOf } from '../../asynciterable/of';

export function _of<T>(...args: T[]) {
  return staticOf(...args);
};

AsyncIterableX.of = _of;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let of: typeof staticOf;
  }
}