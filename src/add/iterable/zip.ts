import { IterableX } from '../../iterable/iterablex';
import { zip as zipStatic } from '../../iterable/zip';

/** @nocollapse */
IterableX.zip = zipStatic;

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let zip: typeof zipStatic;
  }
}
