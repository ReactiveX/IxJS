import { IterableX } from '../../iterable/iterablex';
import { from as fromStatic } from '../../iterable/from';

/** @nocollapse */
IterableX.from = fromStatic;

export declare namespace iterable {
  let from: typeof fromStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX {
    export { fromStatic as from };
  }
}
