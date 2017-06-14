import { AsyncIterableX } from '../../asynciterable';
import { ofEntries as staticOfEntries } from '../../asynciterable/ofentries';

/**
 * @ignore
 */
export function _ofEntries<TSource>(source: { [key: string]: TSource }): AsyncIterableX<[string, TSource]> {
  return staticOfEntries<TSource>(source);
}

AsyncIterableX.ofEntries = _ofEntries;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let ofEntries: typeof _ofEntries;
  }
}