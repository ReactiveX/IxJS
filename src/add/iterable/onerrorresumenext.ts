import { Iterable } from '../../iterable';
import { onErrorResumeNextStatic } from '../../iterable/onerrorresumenext';

Iterable.onErrorResumeNext = onErrorResumeNextStatic;

declare module '../../Iterable' {
  namespace Iterable {
    export let onErrorResumeNext: typeof onErrorResumeNextStatic;
  }
}