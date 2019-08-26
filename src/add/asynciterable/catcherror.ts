import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { catchError as catchErrorStatic } from '../../asynciterable/catcherror';

/** @nocollapse */
AsyncIterableX.catchError = catchErrorStatic;

export declare namespace asynciterable {
  let catchError: typeof catchErrorStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export { catchErrorStatic as catchError };
  }
}
