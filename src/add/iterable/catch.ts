import { IterableX } from '../../iterable';
import { _catchStatic as catchStatic } from '../../iterable/catch';

IterableX['catch'] = catchStatic;

export declare namespace iterable {
  let _catchStatic: typeof catchStatic;
}

declare module '../../iterable' {
  namespace IterableX {
    export { catchStatic as catch };
  }
}