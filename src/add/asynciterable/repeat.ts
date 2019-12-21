import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { repeatValue as _repeatValue } from '../../asynciterable/repeatvalue';

/** @nocollapse */
AsyncIterableX.repeatValue = _repeatValue;

export declare namespace asynciterable {
  let repeatValue: typeof _repeatValue;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX {
    export let repeatValue: typeof _repeatValue;
  }
}
