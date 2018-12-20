import { IterableX } from '../../iterable/iterablex';
import { _for as forStatic } from '../../iterable/for';

/** @nocollapse */
IterableX.for = forStatic;

export declare namespace iterable {
  let _for: typeof forStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { forStatic as for }; }
}
