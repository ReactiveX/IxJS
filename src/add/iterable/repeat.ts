import { IterableX } from '../../iterable/iterablex.js';
import { repeatValue as _repeatValue } from '../../iterable/repeatvalue.js';

/** @nocollapse */
IterableX.repeatValue = _repeatValue;

export declare namespace iterable {
  let repeatStatic: typeof _repeatValue;
}

declare module '../../iterable/iterablex' {
  // eslint-disable-next-line no-shadow
  namespace IterableX {
    export let repeatValue: typeof _repeatValue;
  }
}
