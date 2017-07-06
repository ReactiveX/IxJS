import { AsyncIterableX } from '../../asynciterable';
import { _case as caseStatic } from '../../asynciterable/case';

AsyncIterableX.case = caseStatic;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export { caseStatic as case };
  }
}