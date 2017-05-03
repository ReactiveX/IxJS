import { AsyncIterableX } from '../../asynciterable';
import { of as staticOf } from '../../asynciterable/of';

export async function* _of<T>(...args: T[]) {
  return new AsyncIterableX(staticOf(...args));
};

AsyncIterableX.of = _of;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let of: typeof staticOf;
  }
}