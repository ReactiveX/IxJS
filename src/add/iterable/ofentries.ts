import { IterableX } from '../../iterable/iterablex';
import { ofEntries as ofEntriesStatic } from '../../iterable/ofentries';

IterableX.ofEntries = ofEntriesStatic;

declare module '../../iterable/iterablex' {
  namespace IterableX { export let ofEntries: typeof ofEntriesStatic; }
}
