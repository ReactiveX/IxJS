import { IterableX } from '../../iterable';
import { defer as deferStatic } from '../../iterable/defer';

IterableX.defer = deferStatic;

declare module '../../Iterable' {
  namespace IterableX {
    export let defer: typeof deferStatic;
  }
}