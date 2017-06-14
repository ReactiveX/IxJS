import { IterableX } from '../../iterable';
import { repeatValue as repeatValueStatic } from '../../iterable/repeatvalue';

/**
 * @ignore
 */
export function _repeatValue<T>(value: T, count?: number): IterableX<T> {
  return repeatValueStatic(value, count);
}

IterableX.repeat = _repeatValue;

declare module '../../iterable' {
  namespace IterableX {
    export let repeat: typeof _repeatValue;
  }
}