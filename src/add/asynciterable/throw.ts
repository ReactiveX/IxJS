import { AsyncIterableX } from '../../asynciterable';
import { _throw as throwStatic } from '../../asynciterable/throw';

AsyncIterableX['throw'] = throwStatic;

export declare namespace asynciterable {
  let _throw: typeof throwStatic;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { throwStatic as throw };
  }
}