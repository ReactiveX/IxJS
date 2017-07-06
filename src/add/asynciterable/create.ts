import { AsyncIterableX } from '../../asynciterable';
import { create as createStatic } from '../../asynciterable/create';

AsyncIterableX.create = createStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let create: typeof createStatic;
  }
}