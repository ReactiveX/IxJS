import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { repeatValue as _repeatValue } from '../../asynciterable/repeatvalue.js';

/** @nocollapse */
AsyncIterableX.repeatValue = _repeatValue;

export declare namespace asynciterable {
  let repeatValue: typeof _repeatValue;
}

declare module '../../asynciterable/asynciterablex' {
  // eslint-disable-next-line no-shadow
  namespace AsyncIterableX {
    export let repeatValue: typeof _repeatValue;
  }
}
