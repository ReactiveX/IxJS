import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _for as forStatic } from '../../asynciterable/for';

AsyncIterableX.for = forStatic;

export declare namespace asynciterable {
  let _for: typeof forStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export { forStatic as for }; }
}
