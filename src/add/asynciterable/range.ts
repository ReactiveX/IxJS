import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { range as rangeStatic } from '../../asynciterable/range';

AsyncIterableX.range = rangeStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let range: typeof rangeStatic; }
}
