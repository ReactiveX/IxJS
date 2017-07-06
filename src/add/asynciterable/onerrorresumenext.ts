import { AsyncIterableX } from '../../asynciterable';
import { onErrorResumeNextStatic } from '../../asynciterable/onerrorresumenext';

AsyncIterableX.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}