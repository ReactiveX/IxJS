import { IterableX } from '../../iterable/iterablex';
import { ofValues as ofValuesStatic } from '../../iterable/ofvalues';

IterableX.ofValues = ofValuesStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let ofValues: typeof ofValuesStatic; }
}
