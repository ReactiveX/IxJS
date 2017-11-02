import { IterableX } from '../../iterable/iterablex';
import { _while as whileStatic } from '../../iterable/while';

IterableX.while = whileStatic;

export declare namespace iterable {
  let _while: typeof whileStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { whileStatic as while }; }
}
