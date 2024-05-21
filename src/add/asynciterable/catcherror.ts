import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { catchError as catchErrorStatic } from '../../asynciterable/catcherror.js';

/** @nocollapse */
AsyncIterableX.catchError = catchErrorStatic;

export declare namespace asynciterable {
  let catchError: typeof catchErrorStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { catchErrorStatic as catchError };
  }
}
