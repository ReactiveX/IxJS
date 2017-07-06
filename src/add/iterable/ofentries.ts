import { IterableX } from '../../iterable';
import { ofEntries as ofEntriesStatic } from '../../iterable/ofentries';

IterableX.ofEntries = ofEntriesStatic;

declare module '../../iterable' {
  namespace IterableX {
    export let ofEntries: typeof ofEntriesStatic;
  }
}