import { Iterable } from '../../iterable';
import { repeat as repeatStatic } from '../../iterable/repeat';

Iterable.repeat = repeatStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let repeat: typeof repeatStatic;
  }
}