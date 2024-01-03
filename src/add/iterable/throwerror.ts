import { IterableX } from '../../iterable/iterablex.js';
import { throwError as throwErrorStatic } from '../../iterable/throwerror.js';

/** @nocollapse */
IterableX.throwError = throwErrorStatic;

export declare namespace iterable {
  let throwError: typeof throwErrorStatic;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export { throwErrorStatic as throwError };
  }
}
