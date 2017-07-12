import { AsyncIterableX } from '../../asynciterable';
import { _for as forStatic } from '../../asynciterable/for';

AsyncIterableX['for'] = forStatic;

export declare namespace asynciterable {
  let _for: typeof forStatic;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { forStatic as for };
  }
}