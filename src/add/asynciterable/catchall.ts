import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchAll as catchAllStatic } from '../../asynciterable/catcherror';

/** @nocollapse */
AsyncIterableX.catchAll = catchAllStatic;

export declare namespace asynciterable {
  let catchAll: typeof catchAllStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export { catchAllStatic as catchAll };
  }
}
