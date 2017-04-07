import { IterableImpl } from '../../iterable';
import { from as fromStatic } from '../../iterable/from';

IterableImpl.from = fromStatic;

declare module '../../Iterable' {
  namespace IterableImpl {
    export let from: typeof fromStatic;
  }
}