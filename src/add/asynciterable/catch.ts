import { AsyncIterableX } from '../../asynciterable';
import { _catchStatic as catchStatic } from '../../asynciterable/catch';

AsyncIterableX['catch'] = catchStatic;

export declare namespace asynciterable {
  let _catchStatic: typeof catchStatic;
}

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { catchStatic as catch };
  }
}