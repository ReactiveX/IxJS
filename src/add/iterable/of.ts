import { IterableX } from '../../iterable';
import { of as staticOf } from '../../iterable/of';

export function _of<T>(...args: T[]) {
  return new IterableX(staticOf(...args));
};

IterableX.of = _of;

declare module '../../iterable' {
  namespace IterableX {
    export let of: typeof _of;
  }
}