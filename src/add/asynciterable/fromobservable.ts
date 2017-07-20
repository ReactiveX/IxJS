import { AsyncIterableX } from '../../asynciterable';
import { fromObservable as fromObservableStatic } from '../../asynciterable/fromobservable';

AsyncIterableX.fromObservable = fromObservableStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let fromObservable: typeof fromObservableStatic;
  }
}