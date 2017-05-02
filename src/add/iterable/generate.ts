import { IterableX } from '../../iterable';
import { generate as generateStatic } from '../../iterable/generate';

function _generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean,
    iterate: (value: TState) => TState,
    resultSelector: (value: TState) => TResult): IterableX<TResult> {
  return new IterableX<TResult>(generateStatic<TState, TResult>(initialState, condition, iterate, resultSelector));
}

IterableX.generate = _generate;

declare module '../../iterable' {
  namespace IterableX {
    export let generate: typeof _generate;
  }
}