import { IterableX } from '../../iterable/iterablex';
import { ofKeys as ofKeysStatic } from '../../iterable/ofkeys';

IterableX.ofKeys = ofKeysStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let ofKeys: typeof ofKeysStatic; }
}
