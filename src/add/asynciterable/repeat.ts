import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { repeatStatic as _repeatStatic } from '../../asynciterable/repeat';

/** @nocollapse */
AsyncIterableX.repeat = _repeatStatic;

export declare namespace asynciterable {
  let repeatStatic: typeof _repeatStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let repeat: typeof _repeatStatic; }
}
