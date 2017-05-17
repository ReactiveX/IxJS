import { IterableX } from '../../iterable';
import { create as createStatic } from '../../iterable/create';

export function _create<T>(fn: () => Iterator<T>) {
  return createStatic<T>(fn);
}

IterableX.create = _create;

declare module '../../iterable' {
  namespace IterableX {
    export let create: typeof _create;
  }
}