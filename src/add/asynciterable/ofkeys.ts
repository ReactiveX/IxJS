import { AsyncIterableX } from '../../asynciterable';
import { ofKeys as ofKeysStatic } from '../../asynciterable/ofkeys';

AsyncIterableX.ofKeys = ofKeysStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let ofKeys: typeof ofKeysStatic;
  }
}