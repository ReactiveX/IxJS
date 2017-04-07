import { IterableImpl } from '../../iterable';
import { repeat as repeatStatic } from '../../iterable/repeat';

IterableImpl.repeat = repeatStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let repeat: typeof repeatStatic;
  }
}