import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { zip as zipStatic } from '../../asynciterable/zip';

/** @nocollapse */
AsyncIterableX.zip = zipStatic;

export declare namespace asynciterable {
  let zip: typeof zipStatic;
}

declare module '../../asynciterable/asynciterablex' {
  /* eslint no-shadow: "off" */
  namespace AsyncIterableX {
    export let zip: typeof zipStatic;
  }
}
