import { IterableX } from '../../iterable';
import { of as ofStatic } from '../../iterable/of';

IterableX.of = ofStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let of: typeof ofStatic;
  }
}