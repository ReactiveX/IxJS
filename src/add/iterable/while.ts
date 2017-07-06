import { IterableX } from '../../iterable';
import { _while as whileStatic } from '../../iterable/while';

IterableX.while = whileStatic;

declare module '../../iterable' {
  namespace IterableX {
    export { whileStatic as while };
  }
}