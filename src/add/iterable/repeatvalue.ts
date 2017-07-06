import { IterableX } from '../../iterable';
import { repeatValue as repeatValueStatic } from '../../iterable/repeatvalue';

IterableX.repeat = repeatValueStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let repeat: typeof repeatValueStatic;
  }
}