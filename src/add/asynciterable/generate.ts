import { AsyncIterableX } from '../../asynciterable';
import { generate as generateStatic } from '../../asynciterable/generate';

export function _generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean,
    iterate: (value: TState) => TState,
    resultSelector: (value: TState) => TResult): AsyncIterableX<TResult> {
  return generateStatic<TState, TResult>(initialState, condition, iterate, resultSelector);
}

AsyncIterableX.generate = _generate;

declare module '../../asynciterable' {
  namespace AsyncIterableX {
    export let generate: typeof _generate;
  }
}