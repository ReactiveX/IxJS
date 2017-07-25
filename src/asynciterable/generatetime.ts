import { AsyncIterableX } from '../asynciterable';
import { sleep } from './_sleep';

class GenerateTimeAsyncIterable<TState, TResult> extends AsyncIterableX<TResult> {
  private _initialState: TState;
  private _condition: (value: TState) => boolean | Promise<boolean>;
  private _iterate: (value: TState) => TState | Promise<TState>;
  private _resultSelector: (value: TState) => TResult | Promise<TResult>;
  private _timeSelector: (value: TState) => number | Promise<number>;

  constructor(
      initialState: TState,
      condition: (value: TState) => boolean | Promise<boolean>,
      iterate: (value: TState) => TState | Promise<TState>,
      resultSelector: (value: TState) => TResult | Promise<TResult>,
      timeSelector: (value: TState) => number | Promise<number>) {
    super();
    this._initialState = initialState;
    this._condition = condition;
    this._iterate = iterate;
    this._resultSelector = resultSelector;
    this._timeSelector = timeSelector;
  }

  async *[Symbol.asyncIterator]() {
    for (let i = this._initialState; await this._condition(i); i = await this._iterate(i)) {
      await sleep(await this._timeSelector(i));
      yield await this._resultSelector(i);
    }
  }
}

export function generateTime<TState, TResult>(
    initialState: TState,
    condition: (value: TState) => boolean | Promise<boolean>,
    iterate: (value: TState) => TState | Promise<TState>,
    resultSelector: (value: TState) => TResult | Promise<TResult>,
    timeSelector: (value: TState) => number | Promise<number>): AsyncIterableX<TResult> {
  return new GenerateTimeAsyncIterable<TState, TResult>(
    initialState,
    condition,
    iterate,
    resultSelector,
    timeSelector);
}
