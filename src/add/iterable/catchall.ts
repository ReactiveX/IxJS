import { IterableX } from '../../iterable/iterablex.js';
import { catchAll as _catchAll } from '../../iterable/catcherror.js';

/** @nocollapse */
IterableX.catchAll = _catchAll;

export declare namespace iterable {
  let catchAll: typeof _catchAll;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export { _catchAll as catchAll };
  }
}
