'use strict';

export async function* generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean,
    iterate: (value: TState) => TState,
    resultSelector: (value: TState) => TResult): AsyncIterable<TResult> {
  for (let i = initialState; condition(i); i = iterate(i)) {
    yield resultSelector(i);
  }
}