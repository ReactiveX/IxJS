import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { ofEntries as ofEntriesStatic } from '../../asynciterable/ofentries';

/** @nocollapse */
AsyncIterableX.ofEntries = ofEntriesStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let ofEntries: typeof ofEntriesStatic; }
}
