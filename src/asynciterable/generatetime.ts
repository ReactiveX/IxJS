import { AsyncIterableX } from './asynciterablex';
import { sleep } from './_sleep';

class GenerateTimeAsyncIterable<TState, TResult> extends AsyncIterableX<TResult> {
  private _initialState: TState;
  private _condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>;
  private _iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>;
  private _resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>;
  private _timeSelector: (value: TState, signal?: AbortSignal) => number | Promise<number>;

  constructor(
    initialState: TState,
    condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>,
    iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>,
    resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>,
    timeSelector: (value: TState, signal?: AbortSignal) => number | Promise<number>
  ) {
    super();
    this._initialState = initialState;
    this._condition = condition;
    this._iterate = iterate;
    this._resultSelector = resultSelector;
    this._timeSelector = timeSelector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    for (
      let i = this._initialState;
      await this._condition(i, signal);
      i = await this._iterate(i, signal)
    ) {
      const time = await this._timeSelector(i, signal);
      await sleep(time, signal);
      yield await this._resultSelector(i, signal);
    }
  }
}

export function generateTime<TState, TResult>(
  initialState: TState,
  condition: (value: TState, signal?: AbortSignal) => boolean | Promise<boolean>,
  iterate: (value: TState, signal?: AbortSignal) => TState | Promise<TState>,
  resultSelector: (value: TState, signal?: AbortSignal) => TResult | Promise<TResult>,
  timeSelector: (value: TState, signal?: AbortSignal) => number | Promise<number>
): AsyncIterableX<TResult> {
  return new GenerateTimeAsyncIterable<TState, TResult>(
    initialState,
    condition,
    iterate,
    resultSelector,
    timeSelector
  );
}
