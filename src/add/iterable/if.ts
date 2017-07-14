import { IterableX } from '../../iterable';
import { _if as ifStatic } from '../../iterable/if';

IterableX['if'] = ifStatic;

export declare namespace iterable {
  let _if: typeof ifStatic;
}

declare module '../../iterable' {
  namespace IterableX {
    export { ifStatic as if };
  }
}