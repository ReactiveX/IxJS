import { IterableX } from '../../iterable/iterablex';
import { _throw as throwStatic } from '../../iterable/throw';

/** @nocollapse */
IterableX.throw = throwStatic;

export declare namespace iterable {
  let _throw: typeof throwStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { throwStatic as throw }; }
}
