import { IterableImpl } from '../../iterable';
import { defer as deferStatic } from '../../iterable/defer';

IterableImpl.defer = deferStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let defer: typeof deferStatic;
  }
}