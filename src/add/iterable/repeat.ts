import { IterableX } from '../../iterable/iterablex';
import { repeatValue as _repeatValue } from '../../iterable/repeatvalue';

/** @nocollapse */
IterableX.repeatValue = _repeatValue;

export declare namespace iterable {
  let repeatStatic: typeof _repeatValue;
}

declare module '../../iterable/iterablex' {
  namespace IterableX {
    export let repeatValue: typeof _repeatValue;
  }
}
