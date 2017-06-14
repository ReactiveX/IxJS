import { IterableX } from '../../iterable';
import { ofEntries as staticOfEntries } from '../../iterable/ofentries';

/**
 * @ignore
 */
export function _ofEntries<TSource>(source: { [key: string]: TSource }): IterableX<[string, TSource]> {
  return staticOfEntries<TSource>(source);
}

IterableX.ofEntries = _ofEntries;

declare module '../../iterable' {
  namespace IterableX {
    export let ofEntries: typeof _ofEntries;
  }
}