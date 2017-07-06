import { IterableX } from '../../iterable';
import { _throw as throwStatic } from '../../iterable/throw';

IterableX.throw = throwStatic;

declare module '../../iterable' {
  namespace IterableX {
    export { throwStatic as throw };
  }
}