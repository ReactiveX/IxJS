import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { iif as ifStatic } from '../../asynciterable/iif';

/** @nocollapse */
AsyncIterableX.iif = ifStatic;

export declare namespace asynciterable {
  let iif: typeof ifStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export { ifStatic as iif };
  }
}
