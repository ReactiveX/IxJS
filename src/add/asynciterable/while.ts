import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _while as whileStatic } from '../../asynciterable/while';

AsyncIterableX.while = whileStatic;

export declare namespace asynciterable {
  let _while: typeof whileStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export { whileStatic as while }; }
}
