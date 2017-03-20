import { Iterable } from '../../iterable';
import { defer as deferStatic } from '../../iterable/defer';

Iterable.defer = deferStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let defer: typeof deferStatic;
  }
}