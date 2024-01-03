import { IterableX } from '../../iterable/iterablex.js';
import { zip as zipStatic } from '../../iterable/zip.js';

/** @nocollapse */
IterableX.zip = zipStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let zip: typeof zipStatic;
  }
}
