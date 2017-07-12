import { IterableX } from '../../iterable';
import { _for as forStatic } from '../../iterable/for';

IterableX['for'] = forStatic;

export declare namespace iterable {
  let _for: typeof forStatic;
}

declare module '../../iterable' {
  namespace IterableX {
    export { forStatic as for };
  }
}