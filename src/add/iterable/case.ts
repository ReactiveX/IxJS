import { IterableX } from '../../iterable';
import { _case as caseStatic } from '../../iterable/case';

IterableX.case = caseStatic;

declare module '../../iterable' {
  namespace IterableX {
    export { caseStatic as case };
  }
}