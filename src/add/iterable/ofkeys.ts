import { IterableX } from '../../iterable';
import { ofKeys as staticOfKeys } from '../../iterable/ofkeys';

/**
 * @ignore
 */
export function _ofKeys<TSource>(source: { [key: string]: TSource }): IterableX<string> {
  return staticOfKeys<TSource>(source);
}

IterableX.ofKeys = _ofKeys;

declare module '../../iterable' {
  namespace IterableX {
    export let ofKeys: typeof _ofKeys;
  }
}