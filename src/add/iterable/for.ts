import { IterableX } from '../../iterable';
import { _for as forStatic } from '../../iterable/for';

IterableX.for = forStatic;

declare module '../../iterable' {
  namespace IterableX {
    export { forStatic as for };
  }
}