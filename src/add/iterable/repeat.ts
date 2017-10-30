import { IterableX } from '../../iterable/iterablex';
import { repeatStatic as _repeatStatic } from '../../iterable/repeat';

IterableX.repeat = _repeatStatic;

export declare namespace iterable {
  let repeatStatic: typeof _repeatStatic;
}

declare module '../../iterable/iterablex' {
  namespace IterableX { export let repeat: typeof _repeatStatic; }
}
