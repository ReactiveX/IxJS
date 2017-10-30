import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { fromEventPattern as fromEventPatternStatic } from '../../asynciterable/fromeventpattern';

AsyncIterableX.fromEventPattern = fromEventPatternStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let fromEventPattern: typeof fromEventPatternStatic; }
}
