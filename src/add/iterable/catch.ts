import { IterableX } from '../../iterable/iterablex';
import { _catchStatic as catchStatic } from '../../iterable/catch';

IterableX['catch'] = catchStatic;

export declare namespace iterable {
  let _catchStatic: typeof catchStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { catchStatic as catch }; }
}
