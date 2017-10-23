import { AsyncIterableX } from '../../asynciterable';
import { asyncify as asyncifyStatic } from '../../asynciterable/asyncify';

AsyncIterableX.asyncify = asyncifyStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX { export let asyncify: typeof asyncifyStatic; }
}
