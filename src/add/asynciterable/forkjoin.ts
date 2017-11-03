import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { forkJoin as forkJoinStatic } from '../../asynciterable/forkjoin';

AsyncIterableX.forkJoin = forkJoinStatic;

export declare namespace asynciterable {
  let forkJoin: typeof forkJoinStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export let forkJoin: typeof forkJoinStatic; }
}
