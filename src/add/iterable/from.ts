import { Iterable } from '../../iterable';
import { from as fromStatic } from '../../iterable/from';

Iterable.from = fromStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let from: typeof fromStatic;
  }
}