import { IterableX } from '../../iterable/iterablex';
import { whileDo as whileDoStatic } from '../../iterable/whiledo';

/** @nocollapse */
IterableX.whileDo = whileDoStatic;

export declare namespace iterable {
  let whileDo: typeof whileDoStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX {
    export { whileDoStatic as whileDo };
  }
}
