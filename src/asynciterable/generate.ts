import { AsyncIterableX } from '../asynciterable';

class GenerateAsyncIterable<TState, TResult> extends AsyncIterableX<TResult> {
  private _initialState: TState;
  private _condition: (value: TState) => boolean | Promise<boolean>;
  private _iterate: (value: TState) => TState | Promise<TState>;
  private _resultSelector: (value: TState) => TResult | Promise<TResult>;

  constructor(
      initialState: TState,
      condition: (value: TState) => boolean | Promise<boolean>,
      iterate: (value: TState) => TState | Promise<TState>,
      resultSelector: (value: TState) => TResult | Promise<TResult>) {
    super();
    this._initialState = initialState;
    this._condition = condition;
    this._iterate = iterate;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator]() {
    for (let i = this._initialState; await this._condition(i); i = await this._iterate(i)) {
      yield await this._resultSelector(i);
    }
  }
}

export function generate<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean | Promise<boolean>,
    iterate: (value: TState) => TState | Promise<TState>,
    resultSelector: (value: TState) => TResult | Promise<TResult>): AsyncIterableX<TResult> {
  return new GenerateAsyncIterable<TState, TResult>(initialState, condition, iterate, resultSelector);
}
