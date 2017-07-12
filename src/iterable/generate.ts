import { IterableX } from '../iterable';

class GenerateIterable<TState, TResult> extends IterableX<TResult> {
  private _initialState: TState;
  private _condition: (value: TState) => boolean;
  private _iterate: (value: TState) => TState;
  private _resultSelector: (value: TState) => TResult;

  constructor(
      initialState: TState,
      condition: (value: TState) => boolean,
      iterate: (value: TState) => TState,
      resultSelector: (value: TState) => TResult) {
    super();
    this._initialState = initialState;
    this._condition = condition;
    this._iterate = iterate;
    this._resultSelector = resultSelector;
  }

  *[Symbol.iterator]() {
    for (let i = this._initialState; this._condition(i); i = this._iterate(i)) {
      yield this._resultSelector(i);
    }
  }
}

export function generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean,
    iterate: (value: TState) => TState,
    resultSelector: (value: TState) => TResult): IterableX<TResult> {
  return new GenerateIterable<TState, TResult>(initialState, condition, iterate, resultSelector);
}
