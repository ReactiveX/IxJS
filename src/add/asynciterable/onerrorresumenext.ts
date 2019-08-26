import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { onErrorResumeNext as _onErrorResumeNextStatic } from '../../asynciterable/onerrorresumenext';

/** @nocollapse */
AsyncIterableX.onErrorResumeNext = _onErrorResumeNextStatic;

export declare namespace asynciterable {
  let onErrorResumeNextStatic: typeof _onErrorResumeNextStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}
