import { IterableX } from '../../iterable';
import { ofValues as staticOfValues } from '../../iterable/ofvalues';

export function _ofValues<TSource>(source: { [key: string]: TSource }): IterableX<TSource> {
  return staticOfValues<TSource>(source);
}

IterableX.ofValues = _ofValues;

declare module '../../iterable' {
  namespace IterableX {
    export let ofValues: typeof _ofValues;
  }
}