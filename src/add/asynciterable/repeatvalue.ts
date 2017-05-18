import { AsyncIterableX } from '../../asynciterable';
import { repeatValue as repeatValueStatic } from '../../asynciterable/repeatvalue';

export function _repeatValue<T>(value: T, count?: number): AsyncIterableX<T> {
  return repeatValueStatic(value, count);
}

AsyncIterableX.repeat = _repeatValue;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let repeat: typeof _repeatValue;
  }
}