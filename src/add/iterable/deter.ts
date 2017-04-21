import { IterableX } from '../../iterable';
import { defer as deferStatic } from '../../iterable/defer';

IterableX.defer = deferStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let defer: typeof deferStatic;
  }
}