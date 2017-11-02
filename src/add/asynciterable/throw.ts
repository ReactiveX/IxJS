import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _throw as throwStatic } from '../../asynciterable/throw';

AsyncIterableX.throw = throwStatic;

export declare namespace asynciterable {
  let _throw: typeof throwStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export { throwStatic as throw }; }
}
