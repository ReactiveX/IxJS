import { IterableX } from '../../iterable';
import { repeatStatic as _repeatStatic } from '../../iterable/repeat';

IterableX.repeat = _repeatStatic;

export declare namespace iterable {
  let repeatStatic: typeof _repeatStatic;
}

declare module '../../iterable' {
  namespace IterableX {
    export let repeat: typeof _repeatStatic;
  }
}