import { IterableX } from '../../iterable';
import { ofValues as ofValuesStatic } from '../../iterable/ofvalues';

IterableX.ofValues = ofValuesStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let ofValues: typeof ofValuesStatic;
  }
}