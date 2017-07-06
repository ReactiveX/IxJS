import { IterableX } from '../../iterable';
import { ofKeys as ofKeysStatic } from '../../iterable/ofkeys';

IterableX.ofKeys = ofKeysStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let ofKeys: typeof ofKeysStatic;
  }
}