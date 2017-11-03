import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { zip as zipStatic } from '../../asynciterable/zip';

AsyncIterableX.zip = zipStatic;

export declare namespace asynciterable {
  let zip: typeof zipStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let zip: typeof zipStatic; }
}
