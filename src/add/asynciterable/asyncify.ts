import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { asyncify as asyncifyStatic } from '../../asynciterable/asyncify';

AsyncIterableX.asyncify = asyncifyStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let asyncify: typeof asyncifyStatic; }
}
