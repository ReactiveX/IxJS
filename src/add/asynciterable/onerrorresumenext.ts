import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { onErrorResumeNext as _onErrorResumeNextStatic } from '../../asynciterable/onerrorresumenext.js';

/** @nocollapse */
AsyncIterableX.onErrorResumeNext = _onErrorResumeNextStatic;

export declare namespace asynciterable {
  let onErrorResumeNextStatic: typeof _onErrorResumeNextStatic;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let onErrorResumeNext: typeof _onErrorResumeNextStatic;
  }
}
