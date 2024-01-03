import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { zip as zipStatic } from '../../asynciterable/zip.js';

/** @nocollapse */
AsyncIterableX.zip = zipStatic;

export declare namespace asynciterable {
  let zip: typeof zipStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let zip: typeof zipStatic;
  }
}
