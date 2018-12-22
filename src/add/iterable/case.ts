import { IterableX } from '../../iterable/iterablex';
import { _case as caseStatic } from '../../iterable/case';

/** @nocollapse */
IterableX.case = caseStatic;

export declare namespace iterable {
  let _case: typeof caseStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { caseStatic as case }; }
}
