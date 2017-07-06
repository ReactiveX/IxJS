import { AsyncIterableX } from '../../asynciterable';
import { ofEntries as ofEntriesStatic } from '../../asynciterable/ofentries';

AsyncIterableX.ofEntries = ofEntriesStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let ofEntries: typeof ofEntriesStatic;
  }
}