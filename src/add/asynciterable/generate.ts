import { AsyncIterableX } from '../../asynciterable';
import { generate as generateStatic } from '../../asynciterable/generate';

AsyncIterableX.generate = generateStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let generate: typeof generateStatic;
  }
}