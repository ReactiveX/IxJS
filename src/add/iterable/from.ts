import { IterableX } from '../../iterable';
import { from as fromStatic } from '../../iterable/from';

IterableX.from = fromStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let from: typeof fromStatic;
  }
}