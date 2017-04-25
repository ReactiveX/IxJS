'use strict';

export function* generate<TState, TResult>(
      initialState: TState,
      condition: (value: TState) => boolean,
      iterate: (value: TState) => TState,
      resultSelector: (value: TState) => TResult): Iterable<TResult> {
  for (let i = initialState; condition(i); i = iterate(i)) {
    yield resultSelector(i);
  }
}