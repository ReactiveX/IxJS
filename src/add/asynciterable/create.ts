import { AsyncIterableX } from '../../asynciterable';
import { create as createStatic } from '../../asynciterable/create';

export function _create<T>(fn: () => AsyncIterator<T>) {
  return new AsyncIterableX<T>(createStatic<T>(fn));
}

AsyncIterableX.create = _create;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let create: typeof _create;
  }
}