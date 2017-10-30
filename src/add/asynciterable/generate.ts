import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { generate as generateStatic } from '../../asynciterable/generate';

AsyncIterableX.generate = generateStatic;

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let generate: typeof generateStatic; }
}
