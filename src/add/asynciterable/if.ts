import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _if as ifStatic } from '../../asynciterable/if';

/** @nocollapse */
AsyncIterableX.if = ifStatic;

export declare namespace asynciterable {
  let _if: typeof ifStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export { ifStatic as if }; }
}
