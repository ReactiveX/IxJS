import { IterableX } from '../../iterable/iterablex.js';
import { catchError as _catchError } from '../../iterable/catcherror.js';

/** @nocollapse */
IterableX.catchError = _catchError;

export declare namespace iterable {
  let catchError: typeof _catchError;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export { _catchError as catchError };
  }
}
