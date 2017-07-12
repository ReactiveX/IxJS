import { AsyncIterableX } from '../../asynciterable';
import { repeatStatic as _repeatStatic } from '../../asynciterable/repeat';

AsyncIterableX.repeat = _repeatStatic;

export declare namespace asynciterable {
  let repeatStatic: typeof _repeatStatic;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let repeat: typeof _repeatStatic;
  }
}