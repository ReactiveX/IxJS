import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { _case as caseStatic } from '../../asynciterable/case';

AsyncIterableX['case'] = caseStatic;

export declare namespace asynciterable {
  let _case: typeof caseStatic;
}

declare module '../../asynciterable/asynciterablex' {
  namespace AsyncIterableX { export { caseStatic as case }; }
}
