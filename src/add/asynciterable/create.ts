import { AsyncIterableX } from '../../asynciterable';
import { create as createStatic } from '../../asynciterable/create';

/**
 * @ignore
 */
export function _create<T>(fn: () => AsyncIterator<T> | Promise<AsyncIterator<T>>) {
  return createStatic<T>(fn);
}

AsyncIterableX.create = _create;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let create: typeof _create;
  }
}