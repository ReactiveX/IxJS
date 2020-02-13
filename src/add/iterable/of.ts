import { IterableX } from '../../iterable/iterablex';
import { of as ofStatic } from '../../iterable/of';

/** @nocollapse */
IterableX.of = ofStatic;

export declare namespace iterable {
  let of: typeof ofStatic;
}

declare module '../../iterable/iterablex' {
  /* eslint no-shadow: "off" */
  namespace IterableX {
    export { ofStatic as of };
  }
}
