import { IterableX } from '../../iterable/iterablex';
import { _if as ifStatic } from '../../iterable/if';

IterableX['if'] = ifStatic;

export declare namespace iterable {
  let _if: typeof ifStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export { ifStatic as if }; }
}
