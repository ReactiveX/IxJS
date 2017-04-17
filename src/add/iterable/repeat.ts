import { IterableX } from '../../iterable';
import { repeat as repeatStatic } from '../../iterable/repeat';

IterableX.repeat = repeatStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let repeat: typeof repeatStatic;
  }
}