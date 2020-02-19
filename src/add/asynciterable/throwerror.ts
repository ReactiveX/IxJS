import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { throwError as _throwError } from '../../asynciterable/throwerrror';

/** @nocollapse */
AsyncIterableX.throwError = _throwError;

export declare namespace asynciterable {
  let throwError: typeof _throwError;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export { _throwError as throwError };
  }
}
