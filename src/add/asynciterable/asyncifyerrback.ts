import { AsyncIterableX } from '../../asynciterable';
import { asyncifyErrback as asyncifyErrbackStatic } from '../../asynciterable/asyncifyerrback';

AsyncIterableX.asyncifyErrback = asyncifyErrbackStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX { export let asyncifyErrback: typeof asyncifyErrbackStatic; }
}
