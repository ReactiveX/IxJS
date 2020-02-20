import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchAll as catchAllStatic } from '../../asynciterable/catcherror';

/** @nocollapse */
AsyncIterableX.catchAll = catchAllStatic;

export declare namespace asynciterable {
  let catchAll: typeof catchAllStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { catchAllStatic as catchAll };
  }
}
