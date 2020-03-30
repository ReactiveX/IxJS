import { AsyncIterableX } from './asynciterablex';
import { throwIfAborted } from '../aborterror';

class GenerateAsyncIterable<TState, TResult> extends AsyncIterableX<TResult> {
  private _initialState: TState;
  private _condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>;
  private _iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>;
  private _resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>;

  constructor(
    initialState: TState,
    condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>,
    iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>,
    resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>
  ) {
    super();
    this._initialState = initialState;
    this._condition = condition;
    this._iterate = iterate;
    this._resultSelector = resultSelector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    for (
      let i = this._initialState;
      await this._condition(i, signal);
      i = await this._iterate(i, signal)
    ) {
      yield await this._resultSelector(i, signal);
    }
  }
}

export function generate<TState, TResult>(
  initialState: TState,
  condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>,
  iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>,
  resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>
): AsyncIterableX<TResult> {
  return new GenerateAsyncIterable<TState, TResult>(
    initialState,
    condition,
    iterate,
    resultSelector
  );
}
