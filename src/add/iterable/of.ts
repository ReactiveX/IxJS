import { IterableX } from '../../iterable/iterablex.js';
import { of as ofStatic } from '../../iterable/of.js';

/** @nocollapse */
IterableX.of = ofStatic;

export declare namespace iterable {
  let of: typeof ofStatic;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export { ofStatic as of };
  }
}
