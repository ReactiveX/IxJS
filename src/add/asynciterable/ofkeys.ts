import { AsyncIterableX } from '../../asynciterable';
import { ofKeys as staticOfKeys } from '../../asynciterable/ofkeys';

/**
 * @ignore
 */
export function _ofKeys<TSource>(source: { [key: string]: TSource }): AsyncIterableX<string> {
  return staticOfKeys<TSource>(source);
}

AsyncIterableX.ofKeys = _ofKeys;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let ofKeys: typeof _ofKeys;
  }
}