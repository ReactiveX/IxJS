import { IterableX } from '../../iterable';
import { generate as generateStatic } from '../../iterable/generate';

/**
 * @ignore
 */
export function _generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean,
    iterate: (value: TState) => TState,
    resultSelector: (value: TState) => TResult): IterableX<TResult> {
  return generateStatic<TState, TResult>(initialState, condition, iterate, resultSelector);
}

IterableX.generate = _generate;

declare module '../../iterable' {
  namespace IterableX {
    export let generate: typeof _generate;
  }
}